/**EmptyGhost Demo**/
import Ghost from "../../src";
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