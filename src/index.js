const React = {
    createElement
}

const ReactDOM = {
    render
}

function createElement(tag, attr, ...children) {
   return {
       tag,
       attr,
       children
   }
}

function render(element,container) {
    
}

const element = (
    <div className="text">
        hello<span>world!</span>
    </div>
);

console.log(element)