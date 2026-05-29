

const ApiRequest = async(url='',optionObj=null,errMsg=null)=>{
    try{
        const response = await fetch(url,optionObj)
        if(!response.ok) throw Error('Reload the page')
    }catch(err){
        errMsg=err.message
    }finally{
        return errMsg;
    }
}

export default ApiRequest;