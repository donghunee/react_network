# React 네트워크

시작!!

```
create-react-app react-network
```

state를 쓸 예정이기때문에 App.js 를 class componet로 바꿔줄게요!!  
오늘은 App.js만 수정하고 다룰 예정입니다.

```javascript
// App.js

class App extends React.Component {

    render() {
        return (
            <div>
                리액트 네트워크 시작!!
            </div>
        )
    }
}
export default App; 
```

이제 사전 준비는 끝났습니다.

---

이제 네트워크 통신을 위한 라이브러리에 대해서 알아보겠습니다. react와 react-native에서 쓰이는 대표적인 통신 라이브러리로는 fetch와 axios가 있는데요 둘다 어떤 특징이 있는지 알아보겠습니다.

# Axios
- 사용하기 더 편하다 (fetch도 물론 편하다)
- fetch에서 지원하지 않는 기능들을 지원해준다.
- Promise base

# Fetch
- import 하지않고 쓸 수 있다.
- React Native의 경우 업데이트가 잦아서, 라이브러리가 업데이트를 쫒아오지 못하는 경우가 생기는데, Fetch의 경우 이런 걱정 필요 없음.
- Promise base
- 네트워크 에러가 발생했을 때, 기다려야 함.. > response timeout API 제공 x
- 지원하지 않는 브라우저가 있음. (ES6를 지원하지 않는 브라우저의 경우..)

만약 서버로 POST 요청을 한다고 가정하였을 때 fetch와 axios가 어떤 차이가 있는지 알아보겠습니다.

## Fetch - POST

```javascript
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                property_one: value_one,
                property_two: value_two
            })
        };
let response = await fetch(url, options);  // Promise base 
let responseOK = response && response.ok;
if (responseOK) {
    let data = await response.json();
    // 블라 블라
}
```

## Fetch - POST

```javascript
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                property_one: value_one,
                property_two: value_two
            }
        };
let response = await axios(options); // Promise base 
let responseOK = response && response.status === 200 && response.statusText === 'OK';
if (responseOK) {
    let data = await response.data;
    // 블라블라
}
```

## 결론  

> 사용자의 입맛에 따라 고르면 될것 같다. 간단한 경우엔 fetch를 쓰고 좀더 기능이 필요할땐 axios를 쓰는것도 방법.
React-Native의 경우엔 업데이트가 너무 빠르기 때문에 fetch를 쓰는게 좋아보인다. 결론은 입맛에 따라 고르자!!

---

# React에서 실습

자 이제 통신 실습을 진행해보겠습니다.

서버는 미리 만들어 놓았습니다. API 명세서는 다음 링크에서 확인해주세요~!!  
https://github.com/donghunee/react_study_server

## GET 

App.js 에 state를 만들어 주겠습니다.

```javascript
// App.js

class App extends React.Component {

    state = {
        image : "",  // input file 정보가 담기는 곳
        title : "", // input title 정보가 담기는 곳
        content : "", // input content 정보가 담기는 곳
        imageURL : "", // response 정보가 담기는 곳
    }

    render() {
        return (
            <div>
                리액트 네트워크 시작!!
            </div>
        )
    }

export default App; 
```

## GET

```javascript
// App.js

class App extends React.Component {

    state = {
        image : "",  // input file 정보가 담기는 곳
        title : "", // input title 정보가 담기는 곳
        content : "", // input content 정보가 담기는 곳
        imageURL : "" // response 정보가 담기는 곳
    }

    _getFetch = () => {
        fetch(`https://`, {
            method: "GET",
            headers:{  
              "Content-Type": "application/json;charset=UTF-8",
              'Accept': 'application/json',
              },
            mode:"cors", // CORS (cross-origin)
          })
          .then((response) => {
             return response.json() // response json parse 하기
            })
          .then((response) =>{
            console.log(response) // 블라블라
              this.setState({
                  result : response.data.reactMessage
              })
          })
          .catch((err) => {
              console.log(err)
          })
    }

    render() {
        return (
            <div>
                리액트 네트워크 시작!!
                <button onClick={this._getFetch}>GET 하기</button> 
            </div>
        )
    }
}
export default App; 
```

---

## POST - json data 업로드

```js
// App.js

class App extends React.Component {

    state = {
        image : "",  // input file 정보가 담기는 곳
        title : "", // input title 정보가 담기는 곳
        content : "", // input content 정보가 담기는 곳
        imageURL : "" // response 정보가 담기는 곳
    }

    _postFetch = () => {
        fetch(`http://`, {
            method: "POST",
            headers:{  
              "Content-Type": "application/json;charset=UTF-8",
              'Accept': 'application/json',
              },
            mode:"cors",
            body: JSON.stringify({ // fetch 특징
                title : this.state.title,
                content : this.state.content,
            }),
          })
          .then((response) => {
             return response.json()
            })
          .then((response) =>{
            console.log(response)
            this.setState({
                result : response.data.reactMessage
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }

    _handleSubmit = (event) => {
        this._postFetch() 
        event.preventDefault(); // form 기능 막기
    }

    _handleChange = (event) => {
        const { target: { name, value } } = event // 비구조화 할당
        this.setState({[name] : value}) // dynamic key
        console.log(this.state.value)
    }

    render() {
        return (
            <div>
                리액트 네트워크 시작!!
                <button onClick={this._getFetch}>GET 하기</button> <br />
                <form onSubmit={this._handleSubmit}>
                    <p>title</p>
                    <input type="text" name="title" value={this.state.title} onChange={this._handleChange} />
                    <p>content</p>
                    <input type="text" name="content" value={this.state.content} onChange={this._handleChange} />
                    <input type="submit" value="POST 하기" />
                </form>
            </div>
        )
    }
}
export default App; 
```

---

## POST - 이미지 업로드

```js
// App.js

class App extends React.Component {

    state = {
        image : "",  // input file 정보가 담기는 곳
        title : "", // input title 정보가 담기는 곳
        content : "", // input content 정보가 담기는 곳
        imageURL : "" // response 정보가 담기는 곳
    }

    _postFetch = () => {
        fetch(`http://`, {
            method: "POST",
            headers:{  
              "Content-Type": "application/json;charset=UTF-8",
              'Accept': 'application/json',
              },
            mode:"cors",
            body: JSON.stringify({ // fetch 특징
                title : this.state.titleValue,
                content : this.state.contentValue,
            }),
          })
          .then((response) => {
             return response.json()
            })
          .then((response) =>{
            console.log(response)
            this.setState({
                result : response.data.reactMessage
            })
          })
          .catch((err) => {
              console.log(err)
          })
    }

    _postImageFetch = () => {
        const data = new FormData()
        data.append('image',this.state.image)
        data.append('title',this.state.title)
        data.append('content',this.state.content)

        fetch(`http://`, {
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

    _handleSubmit = (event) => {
        // this._postFetch()
        this._postImageFetch() 
        event.preventDefault(); // form 기능 막기
    }

    _handleChange = (event) => {
        const { target: { name, value } } = event // 비구조화 할당
        if (name == 'image') {
            this.setState({[name]: event.target.files[0]});
        }else {
            this.setState({[name] : value}) // dynamic key
            console.log(this.state.value)
        }
    }

    render() {
        return (
            <div>
                리액트 네트워크 시작!!
                <button onClick={this._getFetch}>GET 하기</button> <br />
                <form onSubmit={this._handleSubmit}>
                    <p>image</p>
                    <input name="image" type="file" onChange={this._handleChange} />
                    <p>title</p>
                    <input type="text" name="title" value={this.state.title} onChange={this._handleChange} />
                    <p>content</p>
                    <input type="text" name="content" value={this.state.content} onChange={this._handleChange} />
                    <input type="submit" value="POST 하기" />
                </form>
                { this.state.imageURL.length > 0 && <img src={this.state.imageURL} /> }
            </div>
        )
    }
}
export default App; 
```

axios는 각자 해보는거로~
