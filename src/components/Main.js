import React, { useState, useEffect } from 'react'
import client from './sanity'
import Prod from './Product'
import { Container, Row } from 'react-bootstrap'
import PaypalExpressBtn from 'react-paypal-express-checkout';


const Main = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const onSuccess = (payment) => {
    console.log("pay success:", payment);
  }
  const onCancel= (data) => {
    console.log("payment no: ", data);
  }
  const onError = (err) =>{
    console.log('payment fail', err )
  }
  let env = 'sandbox';
  let currency= 'USD';
  
  const paypalClient = {
    sandbox:    'Ae901bw6VX6fJQm_y4u2jDSE4EmnKaehNOG_FxloimD7wBcbtDPW2-p_Lqo3icTH8j4v5es5CRdudZEU',
    production: 'Ae901bw6VX6fJQm_y4u2jDSE4EmnKaehNOG_FxloimD7wBcbtDPW2-p_Lqo3icTH8j4v5es5CRdudZEU',
}
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      const products = await client.fetch(` *[_type == 'product']`);
      setProducts(products);
      const categories = await client.fetch(`*[_type=='category']`);
      setCategories(categories);
    }
    catch (e) {
      if (e !== "No current product") {
        alert(e)
      }
    }
  }
  let deleteItem = (product) => {
    let newCart = [];
    cart.map((item, i) => {
      if (i != product) {
        newCart.push(item);
      }
    }
    )
    setCart(newCart);
  }
  let addItem = (product) => {
    let newCart = cart.slice()
    product.quantity = 1;
    newCart.push(product)
    setCart(newCart);
  }

  let incrementQuantity = (product) => {
    let updatedIncreaseQty = cart.slice();
    updatedIncreaseQty[product].quantity = updatedIncreaseQty[product].quantity + 1
    setCart(updatedIncreaseQty)
  }

  let decrementQuantity = (index) => {
    let updateDecreaseQty = cart.slice();
    updateDecreaseQty[index].quantity = updateDecreaseQty[index].quantity - 1;
    setCart(updateDecreaseQty);
  }

  let emptyTotal = [];
  let total = 0;
  cart.map((product, index) => {
    let setTotal = product.quantity * product.price;
    emptyTotal.push(setTotal)
  })
  let sum = emptyTotal.reduce((a, b) => a + b, 0)
  total = sum;

  let close = () => (
    <div className="close" onClick={() => { props.onCloseArticle() }}></div>
  )

  return (
    <div id="main" ref={props.setWrapperRef} style={props.timeout ? { display: 'flex' } : { display: 'none' }}>
      <article id="Shop" className={`${props.article === 'Shop' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
        <h2 style={{color: 'white'}} className="major">Shop</h2>
          <Container>
            <Row>
              <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
              {products.map((product, index) => {
                return (
                  <Prod
                    product={product}
                    addItem={addItem}
                  />
                )
              })}
              </div>
            </Row>
          </Container>
          )
        })}
      </article>
      {close}

      <article id="Cart" className={`${props.article === 'Cart' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
        <h2 className="major">Cart</h2>
        <div style={{ color: 'white' }}>
          {console.log(cart)}
          {cart.map((item, index) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h6>{item.price}</h6>
                <h6>{item.quantity}</h6>
                <h6>{item.color}</h6>
                <button onClick={() => incrementQuantity(index)}> + </button>
                <button onClick={() => decrementQuantity(index)}> - </button>
                <button onClick={() => deleteItem(index)} > delete item </button>
        
              </div>
            )
          })}
          <h1>Total: {total}</h1>
          <PaypalExpressBtn env={env} client={paypalClient} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />

        </div>
      </article>
      {close}

      <article id="Account" className={`${props.article === 'Account' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
        <h2 className="major">Account</h2>
        <form method="post" action="#">
          <div className="field half first">
            <label htmlFor="username">Username</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="password">password</label>
            <input type="text" name="password" id="password" />
          </div>
        </form>
        {close}
      </article>

      <article id="contact" className={`${props.article === 'contact' ? 'active' : ''} ${props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
        <h2 className="major">Contact</h2>
        <form method="post" action="#">
          <div className="field half first">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows="4"></textarea>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" className="special" />
            </li>
            <li>
              <input type="reset" value="Reset" />
            </li>
          </ul>
        </form>
        <ul className="icons">
          <li>
            <a
              href="https://twitter.com/HuntaroSan"
              className="icon fa-twitter"
            >
              <span className="label">Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://codebushi.com" className="icon fa-facebook">
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://codebushi.com" className="icon fa-instagram">
              <span className="label">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/codebushi/gatsby-starter-dimension"
              className="icon fa-github"
            >
              <span className="label">GitHub</span>
            </a>
          </li>
        </ul>
        {close}
      </article>
    </div>
  )
        }
export default Main
