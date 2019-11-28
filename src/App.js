import React from 'react';
import logo from './logo.svg';
import './App.css';



class App extends React.Component {

    state ={
        data:"",
        image:"",
        title: "",
        content: "",
        imageURL:""
    }

    _network = () => {
        fetch(`http://a822e9df.ngrok.io`, {
            method: "GET",
            headers:{  
              "Content-Type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
              },
            mode: 'cors',
            // body: data,
          })
          .then((response) => {
             console.log(response)
             return response.json()
            })
          .then((response) =>{
              this.setState({
                  data:response.data.reactMessage
              })
          })
          .catch((err) => {
              console.log(err)
          })
    } 

    _popo = () => {
        fetch(`http://a822e9df.ngrok.io`, {
            method: "POST",
            headers:{  
              "Content-Type": "application/json;charset=UTF-8",
              'Accept': 'application/json',
            //   "Access-Control-Allow-Origin": "*",
            //   "Access-Control-Allow-Headers":"X-Requested-With"
              },
              mode:"cors",
            body: JSON.stringify({
                title: "ti",
                content: "qweq",
            }),
          })
          .then((response) => {
             return response.json()
            })
          .then((response) =>{
            console.log(response)
              this.setState({
                  data:response.data.reactMessage
              })
          })
          .catch((err) => {
              console.log(err)
          })
    } 

    _imageUpload = () => {
        const data = new FormData()
        data.append('image',this.state.image)
        data.append('title',"coco")
        data.append('content',"coco")

        fetch(`http://a822e9df.ngrok.io/image`, {
            method: "POST",
            // headers:{  
            //     "Content-Type": "multipart/form-data",
            //     },
            body: data,
            })
            .then(response => response.json())
            .then(response => {
               console.log(response)
               this.setState({imageURL:response.data.result.images})
            })
    }

    imageChange = (event) => {
        console.log(event.target.files[0])
        this.setState({image: event.target.files[0]});
    }

    handleSubmit = async (event) => {
        this._imageUpload()
        event.preventDefault();
    }

    handleChange = (event) => {
        const { target: { name, value } } = event // 비구조화 할당
        console.log(name)
        console.log(value)
        if (name === 'image') {
            this.setState({[name]: event.target.files[0]});
            console.log(this.state)
        }else {
            this.setState({[name] : value}) // dynamic key
            console.log(this.state)
        }
    }

    render() {
        return (
            <div>
                <button onClick={this._network}>요요</button>
                <form onSubmit={this.handleSubmit}>
                    <p>image</p>
                    <input name="image" type="file" onChange={this.handleChange} />
                    <p>title</p>
                    <input type="text" name="title" value={this.state.titleValue} onChange={this.handleChange} />
                    <p>content</p>
                    <input type="text" name="content" value={this.state.contentValue} onChange={this.handleChange} />
                    <input type="submit" value="POST 하기" />
                </form>
                <div>
                    {this.state.data}
                    <img src={this.state.imageURL} />
                </div>
            </div>
        )
    }
}


export default App;
