import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://ryuact.jd.com'
});

function POST(api, params, success, fail) {

    instance.post(api, params ? params : {})
    .then(function(res){
        success && success(res.data)
    })
    .catch(function(err){
        fail && fail(err)
    })
}

export function GET(url, params, success, fail) {
  axios.get(url, params ? params : {}).then(function(res){
      success && success(res.data)
  })
  .catch(function(err){
      fail && fail(err)
  })
}

export default POST
