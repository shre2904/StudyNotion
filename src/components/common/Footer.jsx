import React from 'react'
import { FooterLink2 } from "../../data/footer-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const Resources =[
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Project",
    "Videos",
    "workspaces"
]
const Plans =["Paid memberships","For students","Business solutions"]
const Community =["Forums","Chapters","Events"]


const Footer = () => {
  return (
    <div className='bg-richblack-800'>
      <div className='w-11/12 flex lg:flex-row flex-row justify-center items-center gap-8 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14'>
      <div className='border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700'>
      {/* section1 */}
      <div className='lg:w-[50%] flex-wrap  flex row justify-between  gap-3 pl-3 lg:pr-5 lg:border-r lg:border-richblack-700'>
        <div className='w-[30%] lg:w-[30%] flex flex-col gap-3 '>
          <img src={Logo} alt="" className='object-contain' />
          <h1 className='font-semibold text-richblack-50 text-[16px'>
            Company
          </h1>
          <div className='flex flex-col gap-3'>
            {["About","Careers","Affiliates"].map((element,index)=>{
              return(
                <div 
                    key={index}
                    className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all-duration-200'
                >
                  <Link to={element.toLowerCase()}>{element}</Link>
                </div>
              );
            })}
          </div>
          <div className='text-lg flex gap-3'>
            <FaFacebook/>
            <FaGoogle/>
            <FaTwitter/>
            <FaYoutube/>
          </div>
        </div>
        <div className='w-[48%] lg:w-[30%] pl-0 mb-7'>
              <h1 className='font-semibold text-richblack-50 text-[16px'>
                Resources
              </h1>
              <div className='flex flex-col gap-2 mt-2'>
                  {Resources.map((element,index)=>{
                    return(
                      <div
                        key={index}
                        className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all-duration-200 '
                      >
                        <Link to={element.split(" ").join("-").toLowerCase()}>
                        {element}
                        </Link>
                      </div>
                    );
                  })}
              </div>

              <h1 className='font-semibold text-richblack-50 text-[16px] mt-7'>
                Support
              </h1>
              <div className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all-duration-200 mt-2'>
                <Link to={"/Help-center"}>Help Center</Link>
              </div>
        </div>

        <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
             <h1 className='font-semibold text-richblack-50 text-[16px] '>
              Plans
             </h1>

             <div className='flex flex-col gap-2 mt-2'>
                  {Plans.map((element,index)=>{
                    return(
                      <div
                          key={index}
                          className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all-duration-200 '
                      >
                        <Link to={element.split(" ").join("-").toLowerCase()}>
                          {element}
                        </Link>
                      </div>
                    );
                  })}
             </div>

             <h1 className='font-semibold text-richblack-50 text-[16px] mt-7'>
              Community
             </h1>

             <div className='flex flex-col gap-2 mt-2'>
                 {Community.map((element,index)=>{
                    return(
                      <div
                          key={index}
                          className='text-[14px] cursor-pointer hover:text-richblack-50 transition-all-duration-200 '
                      >
                        <Link to={element.split(" ").join("-").toLowerCase()}>
                          {element}
                        </Link>
                      </div>
                    );
                  })} 
             </div>
        </div>

      </div>.

      <div className='lg:w-[50%] flex flex-wrap flex-row gap-3  justify-between pl-3 lg:pl-5 '>
              {FooterLink2.map((ele,i)=>{
                return(
                  <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>

              );
              })}
      </div>
      </div>

      </div>
      <div className='flex flex-row items-center justofy-center w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm'>
          <div className='flex flex-col justify-between lg:items-start items-center lg:flex-row gap-3 w-full'>
            <div className="flex flex-row">
              {BottomFooter.map((ele, i) => {
                return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                        ? ""
                        : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                 <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                     {ele}
                 </Link>
                </div>
                );
              })}
            </div>
            <div className='text-center'> Made with ❤️ Shresth © 2026 Studynotion</div>
          </div>
      </div>
      
    </div>
  )
}

export default Footer
