import React from "react";

export const wrapper = (Child, cutonFallBack) => {
     // 判断jsx
  if (Child.type && !Child._init && !Child._payload) {
    return Child
  } else {
    // 判断是否为clas和function组件
    if (typeof Child === 'function') {
      return <Child></Child>
    } else {
      // 判断是否为lazy组件
      return (
        <React.Suspense fallback={cutonFallBack || <>...</>}>
          {<Child></Child>}
        </React.Suspense>
      )
    }
  }
}