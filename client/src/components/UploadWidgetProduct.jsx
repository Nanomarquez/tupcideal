import { useEffect , useRef } from "react";

const UploadWidgetProduct = ({setImage}) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'de4i6biay',
      uploadPreset: 'ysufzjjp'
    }, function(err,result){
      if(result.event === "queues-end"){
        let img = result.info.files[0].uploadInfo.secure_url
        setImage(img)
      }
      ;
    })
  },[])
  return (

      <button className="px-4 py-1 bg-sky-500 rounded-md text-white font-bold tracking-tighter hover:bg-sky-400 duration-300" onClick={()=> widgetRef.current.open()}>Subir imagen</button>  


  )
}

export default UploadWidgetProduct;