const React = {
    createElement
}

const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = ''
        return render(vnode, container)
    }
}

function createElement(tag, attrs, ...children) {
    return {
        tag,
        attrs,
        children
    }
}

function render(vnode, container) {
    if (typeof vnode === 'string') {  // 如果是文本节点，直接添加到根节点
        const textNode = document.createTextNode(vnode)
        return container.appendChild(textNode)
    }

    const dom = document.createElement(vnode.tag);

    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key]
            setAttribute(dom, key, value)  // 设置属性
        })
    }

    vnode.children.forEach(child => render(child, dom))   // 递归子节点
    container.appendChild(dom)     // 添加到根结点
}

function setAttribute(dom, key, value) {
    if (key === 'className') key = 'class'    // 如果属性名是className，改回class 

    if (/on\w+/.test(key)) {      // 匹配事件监听
        key = key.toLowerCase()
        dom[key] = value || ''
    } else if (key === 'style') {  // 更新style对象
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name] 
            }
        } else {
            if (key in dom) {
                dom[key] = value || ''
            }
            if (value) {
                dom.setAttribute(key, value)
            } else {
                dom.setAttribute(key)
            }
        }
    }
}

function tick() {
    const element = (
        <div>
            <h1 style="color:red">Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
      );
    ReactDOM.render(
        element,
        document.getElementById( 'root' )
    );
}

setInterval( tick, 1000 );