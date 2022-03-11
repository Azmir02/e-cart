import { useContext ,useState} from 'react';
import {Container,Nav,Navbar,Badge,Offcanvas,Row,Col} from 'react-bootstrap'
import {Routes,Route,NavLink, Link,useNavigate} from "react-router-dom";
import { BsCart3,BsHeart } from "react-icons/bs";
import logo from './logo.png'
import Homepage from './Components/Homepage';
import Productpage from './Components/Productpage';
import Productdetails from './Components/Productdetails';
import Signin from './Components/Signin';
import Cart from './Components/Cart';
import Cartpage from './Components/Cartpage';
import { Store } from './Components/Store';
import Wishlist from './Components/Wishlist';
import Compare from './Components/Compare';





function App() {
  let navigate = useNavigate()


  const {state,dispatch,state2,dispatch2} = useContext(Store)
  const {cart:{cartItems}} = state
  const {Wishlist:{WishlistItems}} = state2

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Cartupdate = (item,quantity)=>{
    dispatch({
        type: 'ADD_TO_CART',
        payload: {...item,quantity}
    })
  }

    //for delete cart
    const handleDelete = (item)=>{
      dispatch({
          type: 'DELETE_CART',
          payload: item
      })
    }

    //canvas button click to redirect 

    const handleRedirect = ()=>{
        navigate(`/cartpage`)
        setShow(false)
    }
    
  return (
    <>
        <Navbar>
          <Container>
          <Navbar.Brand className='logo' >
            <Link to = "/">
              <img  src= {logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Nav className="m-auto menu_bar">
            <li>
              <NavLink  to = "/">Home</NavLink>
            </li>
            <li>
              <NavLink  to = "/products">Products</NavLink>
            </li>
            <li>
              <NavLink  to = "/compare">Compare</NavLink>
            </li>
          </Nav>
          <Nav className="menu_bar">
          <div className="cart text-center" onClick={handleShow}>
               
               <BsCart3></BsCart3>
               {state.cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                  {state.cart.cartItems.length}
                 </Badge>
                )
               }
          </div>
          </Nav>
          <Nav className="menu_bar2">
               <Link to = '/wishlist'>
                <div className="cart text-center">
                <BsHeart></BsHeart>
                {state2.Wishlist.WishlistItems.length > 0 && (
                    <Badge pill bg="danger">
                    {state2.Wishlist.WishlistItems.length}
                  </Badge>
                  )
                }
                </div>

               </Link>
          </Nav>
          </Container>
        </Navbar>

        <Offcanvas  show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <h3>Carts Item List's</h3>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
                {cartItems.length == 0 
                ?
                  <div className="erro-cart">
                    <p>Opps! please add your product</p>
                  </div>
                :
                <>
                  {cartItems.map((item)=>(
                        <>
                            <div className='cart-page-details text-center'>
                                <Row className='align-items-center'>
                                        <Col lg = {3}>
                                                <div className="image-det">
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <div className="image-det-name">
                                                    <Link to = {`/products/${item.slug}`}>{item.name}</Link>
                                                </div>      
                                          </Col>  
                                    <Col lg = {3}>
                                        <div className="cart-inc-Or-dec canvas">
                                        <div className="inner-btns d-flex align-items-center justify-content-between">
                                                    <button onClick={()=>Cartupdate(item,item.quantity - 1)}  disabled = {item.quantity == 1}><i class="fa-solid fa-circle-minus"></i></button>
                                                     <span>{item.quantity}</span>
                                                    <button onClick={()=>Cartupdate(item,item.quantity + 1)} disabled = {item.quantity == item.instock}><i class="fa-solid fa-circle-plus"></i></button>
                                          </div>
                                        </div>    
                                    </Col>    
                                    <Col lg = {3}>
                                    <div className="subtotal">
                                        <p>${item._id  ? `${item.quantity * item.price}` : item.price}</p>
                                    </div>
                                       
                                    </Col>    
                                    <Col lg = {3}>
                                        <div className="delete-button canvas-button">
                                            <button onClick={()=>handleDelete(item)} type='buttton'>Delete</button>    
                                        </div>    
                                    </Col>    
                                </Row>    
                            </div>    
                      </>
                            
                        ))}
                </>
                }

                <div className="cart-view">
                  <button  onClick={handleRedirect} type = "button">View Your Cart</button>
                </div>
          </Offcanvas.Body>
        </Offcanvas>




        

      <Routes>
        <Route path = "/" element = {<Homepage/>}></Route>
        <Route path = "/products" element = {<Productpage/>}></Route>
        <Route path = "/products/:slug" element = {<Productdetails/>}></Route>
        <Route path = "/cart" element = {<Cart/>}></Route>
        <Route path = "/cartpage" element = {<Cartpage/>}></Route>
        <Route path = "/signin" element = {<Signin/>}></Route>
        <Route path = "/wishlist" element = {<Wishlist/>}></Route>
        <Route path = "/compare" element = {<Compare/>}></Route>
      </Routes>

     
    </>
  );
}

export default App;
