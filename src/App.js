import { useEffect, useState } from 'react';
import { BrowserRouter as Router , Switch , Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/client/pages/Home';
import Articles from './components/client/pages/Articles';
import clientConfig from './clientConfig';
import axios from 'axios';
import Post from './components/client/Post';
import Login from './components/client/pages/Login';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/client/pages/NotFound';
import NewUser from './components/admin/pages/User/NewUser';
import UserList from './components/admin/pages/User/UserList';
import NewPost from './components/admin/pages/Post/NewPost';
import PostList from './components/admin/pages/Post/PostList';
import Main from './components/admin/pages/Main/Main';
import Tags from './components/admin/pages/Tag/Tags';
import Category from './components/admin/pages/Category/Category';
import AboutUs from './components/client/pages/AboutUs';
import Menu from './components/client/pages/Menu';
import Product from './components/client/Product';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import Cart from './components/client/pages/Cart';


function App() {

  const [posts, setPosts] = useState([])
  const [data, setData] = useState([])


  const renderPosts = (routerProps) =>{
    let postId = parseInt(routerProps.match.params.id)
    let foundPost = posts.find((postObj)=>postObj.id === postId)
    return foundPost ? <Post post={foundPost} /> : "";
  }

  const renderProducts = (routerProps) =>{
    let productId = parseInt(routerProps.match.params.id)
    let foundProduct = data.find((productObj)=>productObj.id === productId)
    return foundProduct ? <Product product={foundProduct} /> : "";
  }

  useEffect(() => {
    axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts`)
    .then((res) => {
      setPosts(res.data)
    })
    .catch((err) => console.error(err));
  } , [])


  const api = new WooCommerceRestApi({
        url: "http://simamojtahedi.ir/cj",
        consumerKey: "ck_09ce04734fa1d608ca71c77fb24158484c3d20f1",
        consumerSecret: "cs_39f6bc975e7cceda69c0bf9623735ed847472d1f",
        version: "wc/v3"
    });

    useEffect(() => {
        api.get("products", {  per_page: 20, })
        .then((response) => {  setData(response.data)})
        .catch((error) => {})
    } , [])

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/login" component={Login} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/menu" component={Menu} />
          <Route path="/cart/:id?" component={Cart} />

          <Route 
            path="/posts/:id" 
            render={(routerProps)=> renderPosts(routerProps)}
          />   

          <Route 
            path="/products/:id" 
            render={(routerProps)=> renderProducts(routerProps)}
          />   

          <Route path="/dashboard" component={Main} />
          <Route path="/newuser" component={NewUser} />
          <Route path="/newpost" component={NewPost} />
          <Route path="/postlist" component={PostList} />
          <Route path="/userlist" component={UserList} />
          <Route path="/tags" component={Tags} />
          <Route path="/category" component={Category} />

 
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
