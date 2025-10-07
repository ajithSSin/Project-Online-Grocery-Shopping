import React from 'react'

const ContactCard = () => {
  return (
    <div className="bg-white py-5 shadow-xl mt-10 rounded-xl 
                    shadow-xl/30 inset-shadow-sm ">
            <div className="w-auto px-4 px-6 text-center">
                {/* <div className="max-w-10xl mx-auto px-4 px-6 text-center"> */}
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Contact Us
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                    Have questions or feedback? We'd love to hear from you!
                </p>
          
                <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="flex items-center 
                                    justify-center space-x-3 p-4 
                                    bg-gray-50 rounded-xl 
                                    hover:bg-stone-300 ">             
                        <div>
                            <p className="font-semibold text-gray-900">
                                Email
                            </p>
                            <p className="text-gray-600">
                                hello@minimart.com
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center 
                                    justify-center space-x-3 p-4 
                                    bg-gray-50 rounded-xl 
                                    hover:bg-stone-300 ">
         
                        <div>
                            <p className="font-semibold text-gray-900">
                                Phone
                            </p>
                            <p className="text-gray-600">
                                +91-98-7654-3210
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center 
                                    space-x-3 p-4 
                                    bg-gray-50 rounded-xl 
                                    hover:bg-stone-300 ">
                        <div>
                            <p className="font-semibold text-gray-900">
                                Address
                            </p>
                            <p className="text-gray-600">
                                Kazhakoottam
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ContactCard