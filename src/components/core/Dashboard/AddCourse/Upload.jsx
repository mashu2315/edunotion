// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"
// import { useSelector } from "react-redux"

// import "video-react/dist/video-react.css"
// import { Player } from "video-react"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//   accept: !video
//     ? { "image/*": [] }
//     : { "video/mp4": [] },
//   onDrop,
// });


//   const previewFile = (file) => {
//     // console.log(file)
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [register])

//   useEffect(() => {
//     if (selectedFile) {
//       setValue(name, selectedFile, { shouldValidate: true })
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFile, setValue])

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>
//       <div
//         className={`${
//           isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//         } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//       >
//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             {!video ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover"
//               />
//             ) : (
//               <Player aspectRatio="16:9" playsInline src={previewSource} />
//             )}
//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("")
//                   setSelectedFile(null)
//                   setValue(name, null)
//                 }}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div
//             className="flex w-full flex-col items-center p-6"
//             {...getRootProps()}
//           >
//             <input {...getInputProps()} ref={inputRef} />
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>
//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span> a
//               file
//             </p>
//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>
//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }



// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"
// import { useSelector } from "react-redux"
// import { Player } from "video-react"
// import "video-react/dist/video-react.css"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   // Handle dropped or manually selected file
//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !video
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] },
//     onDrop,
//   })

//   // Create preview
//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//   }, [register])

//   useEffect(() => {
//     if (selectedFile) {
//       setValue(name, selectedFile, { shouldValidate: true })
//     }
//   }, [selectedFile, setValue])

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>

//       {/** MAIN CLICK + DRAG AREA */}
//       <div
//         {...getRootProps()}
//         className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
//           flex min-h-[250px] cursor-pointer items-center justify-center
//           rounded-md border-2 border-dotted border-richblack-500`}
//       >
//         <input {...getInputProps()} ref={inputRef} />

//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             {!video ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover"
//               />
//             ) : (
//               <Player aspectRatio="16:9" playsInline src={previewSource} />
//             )}

//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setPreviewSource("")
//                   setSelectedFile(null)
//                   setValue(name, null)
//                 }}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="flex w-full flex-col items-center p-6">
//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>

//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag & drop a {!video ? "image" : "video"}
//               <br /> or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span>
//             </p>

//             {!video && (
//               <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//                 <li>Aspect ratio 16:9</li>
//                 <li>Recommended 1024×576</li>
//               </ul>
//             )}
//           </div>
//         )}
//       </div>

//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { Player } from "video-react"
import "video-react/dist/video-react.css"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [preview, setPreview] = useState(viewData || editData || null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    setValue(name, file, { shouldValidate: true })

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: video
      ? { "video/*": [".mp4"] }
      : { "image/*": [".jpg", ".jpeg", ".png"] },
  })

  useEffect(() => {
    register(name, { required: true })
  }, [])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-white font-medium">{label}</label>

      {/* Main Upload Box */}
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center bg-richblack-700
          w-full min-h-[260px] rounded-xl border-2 border-dashed 
          transition-all duration-300 cursor-pointer
          ${isDragActive
            ? "border-yellow-400 bg-yellow-400/10"
            : "border-gray-500"}
          hover:border-yellow-300 hover:bg-gray-700/40
        `}
      >
        <input {...getInputProps()} />

        {/* Preview */}
        {preview ? (
          <div className="w-full h-full p-3 flex flex-col">
            {!video ? (
              <img
                src={preview}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              <Player
                playsInline
                src={preview}
                aspectRatio="16:9"
                className="rounded-lg"
              />
            )}

            <button
              type="button"
              className="mt-3 text-sm text-pink-500 hover:text-pink-400 hover:scale-105 self-start"
              onClick={(e) => {
                e.stopPropagation()
                setPreview(null)
                setValue(name, null)
              }}
            >
              Remove file
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 shadow-md">
                <FiUploadCloud className="text-3xl text-yellow-400" />
              </div>

              <p className="mt-3 text-gray-300 font-medium">
                Click to upload or drag & drop
              </p>

              <p className="text-xs mt-1 text-gray-400">
                {video ? "MP4 only" : "JPG, JPEG, PNG only"}
              </p>

              <p className="text-xs mt-3 text-gray-500 italic">
                Recommended: 16:9 ratio (1024×576)
              </p>
            </div>
          </>
        )}
      </div>

      {errors[name] && (
        <p className="text-sm text-red-400">{label} is required</p>
      )}
    </div>
  )
}
