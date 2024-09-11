import * as React from 'react';

// 定义 `EmptyGhost` 组件的 Props 接口，继承自 HTMLDivElement 的属性
export interface EmptyGhostProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * @default div
     * `is` 表示要扩展的元素类型，默认值是 `div`
     */
    is?: string,

    /**
     * 自定义样式，禁止覆盖 `display` 属性，因为组件内部强制使用 `display: contents`
     */
    style?: Omit<React.CSSProperties, "display">
}

/**
 * assignment 函数用于将子节点（`firstChild`）赋值给 `ref`，
 * 确保传递给父组件的 ref 能引用到组件内容的实际 DOM 节点
 * @param node - 包含子节点的容器节点
 * @param ref - React 的 ref，用于传递 DOM 元素
 */
function assignment(node: HTMLDivElement | null, ref: React.ForwardedRef<Element | null | Text>) {
    const content = (node?.firstChild || null) as (Element | Text | null);

    // 如果 ref 是函数，则调用该函数，否则直接将内容赋值给 ref 的 current
    typeof ref === 'function' ? ref(content) : ref && (ref.current = content);
}

// 注册 `empty-ghost` 自定义元素，扩展 `HTMLElement`
customElements.define('empty-ghost', class Fragment extends HTMLElement {
    constructor() {
        super(); // 调用父类的构造函数
        this.attachShadow({ mode: 'open' }); // 创建 `Shadow DOM`，模式为 `open`
    }

    // 当元素插入到文档时调用
    connectedCallback() {
        // 使用 `display: contents` 样式，使得该元素在布局中透明
        this.shadowRoot!.innerHTML = `
          <style>
            :host{
                display: contents !important; /* 使元素不渲染为一个可见容器 */
            }
          </style>
          <slot></slot>  <!-- 占位符，允许内容插入到自定义元素中 -->
        `;
    }
});

/**
 * EmptyGhostRender 是一个 `ForwardRefRenderFunction` 函数，允许传递 ref 以获取子节点 DOM
 * @param props - 组件的 props，包含样式、类名、子元素等
 * @param ref - React forwardRef 提供的 ref，用于传递到真实 DOM 节点
 */
const EmptyGhostRender: React.ForwardRefRenderFunction<Element | null | Text, EmptyGhostProps> = (props, ref) => {
    // 使用 `useRef` 钩子来引用空容器节点
    const contentsRef = React.useRef<HTMLDivElement | null>();

    // 监听容器节点的变化并更新 ref
    React.useLayoutEffect(() => {
        // 创建一个 `MutationObserver` 来监听 DOM 变化
        const ob = new MutationObserver(() => {
            assignment(contentsRef.current!, ref);  // 当 DOM 变化时更新 ref
        });

        // 监听子节点的变动（但不监听属性变化）
        ob.observe(contentsRef.current!, { childList: true, subtree: false, attributes: false });

        return () => {
            ob.disconnect();  // 组件卸载时断开观察器
        }
    }, [ref]);

    // 监听组件加载后的样式情况
    React.useLayoutEffect(() => {
        const styles = window.getComputedStyle(contentsRef.current!);  // 获取元素的样式
        if (styles.display !== 'contents') {  // 如果 display 不是 contents，发出警告
            console.warn(`[EmptyGhost]:`, contentsRef.current, `better a empty element`);
        }
    }, []);

    // 解构 props，获取 className 和 children，其余属性作为 rest
    const { className, children, ...rest } = props;

    // 创建 `empty-ghost` 自定义元素，传递 ref、className 和 style 等
    return React.createElement("empty-ghost",
        {
            ref: (node: HTMLDivElement | null) => {
                assignment(node, ref);  // 绑定当前 DOM 节点到 ref
                contentsRef.current = node;  // 将容器节点保存到 ref
            },
            ...rest,  // 其余属性传递给元素
            class: className,  // 传递 className
            style: {
                ...props.style,  // 保留传递的样式
                display: undefined  // 避免覆盖 `display`，确保 display: contents 生效
            },
        },
        children  // 将子元素插入到 `empty-ghost` 元素中
    );
}

// 使用 `forwardRef` 将 EmptyGhostRender 包装成带 ref 的组件
const EmptyGhost = React.forwardRef(EmptyGhostRender);

EmptyGhost.displayName = 'EmptyGhost';  // 设置组件的 displayName，方便调试
export default EmptyGhost;  // 导出组件
