   

empty-ghost
===========

该组件允许开发者在不影响页面布局的情况下插入内容，同时通过 React 的 ref 功能获取到其子元素的真实 DOM 并且事件传递

[![NPM Version](https://img.shields.io/npm/v/empty-ghost?color=33cd56&logo=npm)](https://www.npmjs.com/package/empty-ghost)  [![NPM Version](https://img.shields.io/npm/dm/empty-ghost.svg?style=flat-square)](https://www.npmjs.com/package/empty-ghost)  [![unpacked size](https://img.shields.io/npm/unpacked-size/empty-ghost?color=green)](https://www.npmjs.com/package/empty-ghost)  [![Author](https://img.shields.io/badge/docs_by-robertpanvip-blue)](https://github.com/robertpanvip/empty-ghost.git)

📦 **Installation**
-------------------

    npm install empty-ghost

🔨 **Usage**
------------

    /**EmptyGhost Demo**/
    import Ghost from "empty-ghost";
    /**
     * The function of the EmptyGhost is to render not only children, but also click events in the proxy children
     * It is equivalent to rendering < div > {children} < / div > but deleting the div after the first rendering
     **/
    export function App() {
    
        return (
            <Ghost
                ref={(ref)=>{
                    console.log('You will get the divs ref !!!',ref);
                }}
                onClick={(e)=>{
                    console.log('any event you can add to EmptyGhost ',e);
                }}
            >
                <div>123</div>
            </Ghost>
        );
    }

[🖥️](https://code.juejin.cn/)  
  

🏠 Exports
----------

### 

|参数|类型|
|---|---|
|📒EmptyGhostProps|`Interfaces`|
|🎗️default|`Functions`|

**📒Interfaces**
----------------

  
  

#### EmptyGhostProps

|参数|类型|说明|默认值|
|---|---|---|---|
|is|?: `string`|||
|style|?: `Omit`<`React.CSSProperties`, `"display"`\>|自定义样式，禁止覆盖 \`display\` 属性，因为组件内部强制使用 \`display: contents\`||

**🎗️Functions**
----------------

  
  

#### EmptyGhost

*   EmptyGhost(props:`EmptyGhostProps` & `React.RefAttributes`<`null` | `Element` | `Text`\>): `React.ReactNode`