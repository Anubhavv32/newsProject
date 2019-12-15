import React, { Component } from 'react'
import './mainbar.css';
import logo from './image/logo.png';
import search from './image/search.svg';
import axios from 'axios';




function timeSince(date) {

    var seconds = Math.floor((new Date()/1000 - date) );
    var interval = Math.round(seconds / 31536000);
  console.log(interval)
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.round(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.round(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.round(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.round(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.round(seconds) + " seconds ago";
  }
 
var d1 = new Date();
//  d1.toUTCString();
console.log("d1",d1)
export default class Mainbar extends Component {
    constructor(){
        super()
        this.state = {
            newsList:"",
            sort:"search",
            query:"",
            tag:"story",
            timestamp:"created_at_i<"+Math.floor((d1.getTime())/1000),
            i:0
        }
    }
minusHandler=(e)=>{
    console.log(e,this.state.i)
    this.setState({i:this.state.i-1},()=>{
        this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
    })
}
plusHandler=(e)=>{
    console.log("1111111",e,this.state.i)
    this.setState({i:this.state.i+1},()=>{
        this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
    })
}
queryHandler=(e)=>{
this.setState({query:e.target.value},()=>{
    this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
})
}


tagHandler=(e)=>{
this.setState({tag:e.target.value},()=>{
    this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
})
}

timeHandler=(e)=>{
    if(e.target.value == 0){
    let time1 = Math.floor((d1.getTime()) / 1000)
    this.setState({timestamp:"created_at_i<"+time1},()=>{
        this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
    })
    }
    else {
        let time1 = Math.floor((d1.getTime()) / 1000)
        let time2 = Math.floor((new Date(new Date().setDate(new Date().getDate() - e.target.value))).getTime()/1000)
        this.setState({timestamp:"created_at_i<"+time1+",created_at_i>"+time2},()=>{
            this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
        })
    
    }
}

sortHandler=(e)=>{
this.setState({sort:e.target.value},()=>{
    this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
})
}
    componentDidMount(){
        console.log("llll",this.state.sort,this.state.query,this.state.tag,this.state.time1)
        this.firstApi(this.state.sort,this.state.query,this.state.tag,this.state.timestamp,this.state.i)
    }

    // Api Calling
    firstApi(sort,query,tag,timestamp,i){
        console.log("http://hn.algolia.com/api/v1/"+sort+"?query="+query+"&tags="+tag+"&numericFilters="+timestamp+"&page="+i)
       
        axios.get("http://hn.algolia.com/api/v1/"+sort+"?query="+query+"&tags="+tag+"&numericFilters="+timestamp+"&page="+i)
        .then((res)=>{
console.log(res.data["hits"])
console.log("oooooo1111")
            if(res){
                this.setState({newsList:res.data["hits"]})
            }
        })
        .catch((err)=>{
console.log("oooooo")
        })
    }
    
    // Event Handling
    render() {
        console.log(this.state.time1)
        return (
            <div className="container">
            <div style={{background:"#ff742b"}}>
            <nav className="navbar navbar-expand-lg navbar-light " style={{background:"#ff742b"}}>
        <a className="navbar-brand" href="/">
            <img src={logo} style={{width:"48px"}} alt=""/>
            <div><span>Search<br/>Hacker News</span></div>
        </a>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
        <div className="form-group has-search">
    <span className="fa fa-search form-control-feedback">
        <img src={search} style={{width:"24px"}} alt=""/>
    </span>
    <input type="text" className="form-control " placeholder="Search stories by title, url or author"
    onChange={this.queryHandler}/>
  </div>
  
        </div>
      </nav>
            </div>
                <div className="filter-bar">
                    <div className="filter-bar-span">
                        <span>Search</span>
                        <span><div class="form-group col-md-4">
      
      <select id="inputState" class="form-control width1" onChange={this.tagHandler}>
        <option  value="all">All</option>
        <option selected value="story">stories</option>
        <option value="comment">comments</option>
      </select>
    </div></span>
                        
                    </div>
                    <div  className="filter-bar-span">
                    <span>by</span>
                    <span><div class="form-group col-md-4">
    
      <select id="inputState" className="form-control width1" onChange={this.sortHandler}>
        <option selected value="search">Popularity</option>
        <option value="search_by_date">Date</option>
      </select>
    </div></span>
                    </div>
                    <div  className="filter-bar-span"> 
                    <span>for</span>
                    <span><div class="form-group col-md-4">
     
      <select id="inputState" className="form-control width1" onChange={this.timeHandler}>
        <option selected value="all">All time</option>
        <option value="1">Last 24h</option>
        <option value="7">Past week</option>
        <option value="30">Past month</option>
        <option value="30">Past year</option>
        <option value="custom">Custom range</option>
      </select>
    </div></span>
                    </div>
                    <div  className="filter-bar-span"> 
                    <span><p>Current Page</p></span>
                    <span>
                    <input type="text" style={{width:"100%"}}className="form-control" disabled value={this.state.i+1}/>
    </span>
                    </div>
                </div>
                <div className="content-box">
                    <div>
                      
                            {Array.isArray(this.state.newsList) ? 
                            this.state.newsList.map((item,i)=>{
                               
                                return(
                                <article className="article-box">
                                    {item["title"] != null && item["title"] != "" ?  <div className="article-box-1" style={{textAlign:"left",cursor:"pointer"}}>
                                <a href={item["url"]} style={{color:"black"}}><span >{item["title"]}</span></a><a href={item["url"]} className="article-span"><span>{"("+item["url"]+")"}</span></a>
                                    </div> : ""}.
                                    <div className="article-box-2" style={{textAlign:"left"}}>
                                    <a className="article-link" href={"https://news.ycombinator.com/item?id="+item["objectID"]}>{item["points"]} points</a> | 
                                    <a className="article-link" href={"https://news.ycombinator.com/item?id="+item["author"]}>{item["author"]}</a> | 
                                    <a className="article-link" href={"https://news.ycombinator.com/item?id="+item["objectID"]}>{item["num_comments"]} comments</a> | 
                                    <a className="article-link" href={"https://news.ycombinator.com/item?id="+item["objectID"]}>{timeSince(item["created_at_i"])}</a>
                                    </div >
                                    <div className="article-cmnt"  dangerouslySetInnerHTML={{ __html: item["comment_text"] != null ?  item["comment_text"].replace(/.\n/g,'<br />')  : null }}></div>
                    
                                    </article>
                                )
                            })
                            :null}
                            
                     
                    </div>
                    <div className="pagination-box">
                        <button type="button" disabled={this.state.i<=0} onClick={this.minusHandler}>Previous</button>
                       
                        <button type="button" disabled={this.state.i>= 30} onClick={this.plusHandler}>Next</button>
                    </div>
                </div>
                <div className="footer">
                    Api
                </div>
            </div>
        )
    }
}
