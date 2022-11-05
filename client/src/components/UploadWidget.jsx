import { useEffect , useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'de4i6biay',
      uploadPreset: 'ysufzjjp'
    }, function(err,result){
      console.log(result);
    })
  },[])
  return (
    <button onClick={()=> widgetRef.current.open()}>Upload</button>
  )
}

export default UploadWidget;