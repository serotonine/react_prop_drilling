# react_prop_drilling

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8244656#questions/10025238

### Source code

https://github.com/academind/react-complete-guide-course-resources/blob/main/code/10%20Advanced%20State%20Management%20with%20Context%20useReducer/04-consuming-context/src/components/Cart.jsx

## Prop drilling concept

Passing shared datas through multiple components layers.
E.g. https://github.com/serotonine/react_practice_project

### Component Composition

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8246378#questions/10025238

=> Instead of nesting a component in a component move the nesting component straight at the APP layer.

```
<Shop>
// This loop is not anymore in the Shop component.
    {DUMMY_PRODUCTS.map((product) => (
        <li key={product.id}>
        <Product {...product} onAddToCart={handleAddItemToCart} />
        </li>
    ))}
</Shop>
```

## React's Context API

Create a context value and wrap this context around components.
You can connect this context to State.

#### Context.Provider

```
 <CartContext.Provider value={contextValue}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
```

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8246374#questions/10025238

#### useContext() hook

```
import { useContext } from "react";
export function MyComponent({...props}){
    const _cartContext = useContext(CartContext);
    ....
    return
     <div id="cart">
        {_cartContext.items.map((item) => { .... })}
    </div>
}
```

#### Context.Consumer

Another way to get the Context values. useContext()
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/40272478#questions/10025238

More cumbersome and difficult to read dixit Max.

```
export default function Cart({ onUpdateItemQuantity }) {
  return (
    <CartContext.Consumer>
      {/* You should pass a function as a child where the param is a ref to the current Context. */}
      {(_cartContext) => {
        const totalPrice = ...;
        const formattedTotalPrice = ...;
        return (
          <div id="cart">
           [... markup]
          </div>
        );
      }}
    </CartContext.Consumer>
  );
}

```

### Outsourcing Context & State into a separate provider

Let's create a wrapping CartContextProvider component
instead of setting all logic in the App.

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8298056#questions/14817140

### useReducer() : another State manager

A reducer is a function that reduce one or more complex values to a simpler one.
https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8244660#questions

```
// Execute function to set outside the component fct to not to be read on each re-evaluation.
// 2 params => state and action to be executed.
function valueStateReducer(state, action){
    return state;
}

// Hook signature (into component fct).
[valueState, dispatchValueState] = useReducer(valueStateReducer, initialValue)
```

## Context Exercice

https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/quiz/6070576#questions
