<template >

    <div class="pb-10">

        <!-- toast -->
        <div :class="showToast ? 'right-3' : '-right-80'" class="transition-all duration-300 fixed top-4 flex items-center w-full max-w-[260px] px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div :class="isIconToast ? 'text-green-500 bg-green-100' : 'text-orange-500 bg-orange-100'" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
                <svg v-if="isIconToast" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <svg v-else class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
            </div>
            <div class="ms-3 text-sm font-normal">{{ messageToast }}</div>
            <button @click="closeToast" v-if="!isIconToast" type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        <!-- toast -->
        
        <!-- confirm delete -->
        <div v-if="confirmDelete" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-md w-full">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this User?</h3>
                            <button @click="deleteUser" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="btnCloseDelete" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirm delete -->

        <!-- forms profile -->
        <div v-if="add" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div class="absolute top-1/2 left-1/2 bg-white p-6 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-2xl w-10/12 h-5/6 overflow-y-scroll">

                <form @submit.prevent>
                    <!-- Role User -->
                    <div class="relative z-0 w-full mb-3 group">
                        <select v-model="addUser.role_id" id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option disabled :value="0">Role id</option>
                            <option value="1">Admin</option>
                            <option value="2">User</option>
                            <option value="3">Pastor</option>
                        </select>
                    </div>
                    <!-- Role User -->
                     
                    <!-- Status User -->
                    <div v-if="!btn_edit_or_addUser" class="relative z-0 w-full mb-3 group">
                        <select v-model="addUser.active_id" id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option disabled :value="0">Role id</option>
                            <option value="1">Active</option>
                            <option value="2">Pending</option>
                            <option value="3">Block</option>
                        </select>
                    </div>
                    <!-- Status User -->

                    <!-- Name -->
                    <div class="relative z-0 w-full mb-3 group">
                        <input v-model="addUser.name"  type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <!-- Name -->

                    <!-- email -->
                    <div class="relative z-0 w-full mb-3 group">
                        <input v-model="addUser.email" type="email" name="email_user" id="email_user" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="email_user" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <!-- email -->

                    <!-- password -->
                    <div v-if="btn_edit_or_addUser" class="relative z-0 w-full mb-3 group">
                        <input v-model="addUser.password" type="password" name="password_user" id="password_user" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="password_user" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <!-- password -->

                    <!-- Gereja -->
                    <div class="relative z-0 w-full mb-3 group">
                        <select v-model="addUser.gereja_id" id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option disabled :value="0">Choose ur Church</option>
                            <option v-for="(church, index) in allChurch" :key="index" :value="church.id">{{ church.nama_gereja }}</option>
                        </select>
                    </div>
                    <!-- Gereja -->

                    <!-- No hp -->
                    <div class="relative z-0 w-full mb-3 group">
                        <input v-model="addUser.no_hp" type="text" name="no_hp" id="no_hp" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="no_hp" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No handphone</label>
                    </div>
                    <!-- No hp -->

                    <!-- Alamat -->
                    <div class="relative z-0 w-full mb-3 group">
                        <textarea v-model="addUser.alamat" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900" placeholder="Address..."></textarea>
                    </div>
                    <!-- Alamat -->

                    <!-- Photo user -->
                    <div class="relative z-0 w-full mb-3 group">
                        <label class="block mb-2 text-sm font-medium text-gray-500 dark:text-white" for="small_size">Photo user</label>
                        <input @change="handleFileChange($event)" class="block w-full mb-5 text-xs text-blue-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file">
                    </div>
                    <!-- Photo user -->

                    <div class="w-full flex gap-3 justify-center">
                        <button v-if="btn_edit_or_addUser" @click="nambahinUser" type="submit" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Submit</button>
                        <button v-else @click="btn_editUser" type="submit" class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center dark:bg-emerald-700 dark:hover:bg-emerald-800 dark:focus:ring-emerald-800">Edit</button>
                        <button @click="btnCloseUser" type="button" class=" text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center ">Cancel</button>
                    </div>
                </form>

            </div>
        </div>
        <!-- forms profile -->

        <!-- User -->
        <div>
            <div class="pl-20 pb-2 border-b-2 border-gray-200">
                <h1 class="font-semibold text-3xl text-slate-700">User</h1>
            </div>

            <!-- search user -->
            <div class="mt-5 px-7 bg-white">
                <div class="flex items-center p-1">
                    <box-icon name='search-alt-2'></box-icon>
                    <input v-model="search" type="text" class="border-none focus:ring-white w-full" placeholder="Username">
                </div>
            </div>
            <!-- search user -->

            <div class="mx-10 mt-10">

                <button @click="btnAddUser" type="button" class="text-white px-10 p-2 rounded-md shadow bg-blue-900 hover:bg-blue-800">Add user</button>

                <div class="mt-3 bg-white">
                    

                    <div class=" overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Role User
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Detail User
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in allUser" :key="user.id"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ user.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ user.role_id === 1 ? 'Admin' : (user.role_id === 2 ? 'User' : 'Pastor') }}
                                    </td>
                                    <td :class="user.active_id == 1 ? 'text-green-500' : (user.active_id == 2 ? 'text-yellow-400' : 'text-red-400')"lass="px-6 py-4 ">
                                        {{ user.active.active }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <RouterLink :to="{name: 'admindetailuser', params: { id: user.id}}" class="font-medium text-blue-900 dark:text-green-900 hover:underline">Detail</RouterLink>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button @click="editUser(user.id)" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </button> |
                                        <button @click="btnConfirmDelete(user.id)" type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>

                <div class="mt-4 w-[150px] mx-auto flex flex-row justify-center">
                    <span @click="prevPage" class="mr-2 btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                        Prev
                    </span>
                    <span @click="nextPage"  class="btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                        Next
                    </span>
                </div>

            </div>
        </div>
        <!-- User -->

        
        <!-- ketegori for pastor -->

        <!-- form ketegori -->
        <div v-if="kategoriForm" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-md w-10/12">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            
                            <div class="mb-4">
                                <label for="kategori" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Add kategori pastor</label>
                                <input v-model="nameKategori" type="text" id="kategori" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <button v-if="validateBtn" @click="addKategoriPastor" data-modal-hide="popup-modal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Add kategori
                            </button>
                            <button v-else @click="confirmBtnEditKategori" data-modal-hide="popup-modal" type="button" class="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Edit kategori
                            </button>
                            <button @click="btnCancelKategori" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- form ketegori -->

        <!-- confirm delete -->
        <div v-if="deleteKategori" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-md w-full">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Kategori Pastor?</h3>
                            <button @click="confirmBtnDeleteKategori" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="btnCloseDeleteKategori" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirm delete -->

         <div class="">
             <div class="my-7 pl-20 py-4 border-y-2 border-gray-200">
                 <h1 class="font-semibold text-3xl text-slate-700">Kategori pastor</h1>
             </div>

            <!-- search kategori -->
            <div class="my-5 px-7 bg-white">
                <div class="flex items-center p-1">
                    <box-icon name='search-alt-2'></box-icon>
                    <input v-model="searchKategori" type="text" class="border-none focus:ring-white w-full" placeholder="Kategori">
                </div>
            </div>
            <!-- search kategori -->

             <div class="mx-10">
                <button @click="btnAddKategori" type="button" class="text-white px-8 p-2 rounded-md shadow bg-blue-900 hover:bg-blue-800">Add kategori</button>

                <div class="mt-3 bg-white">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Kategori
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kategori, index) in allKategori" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ kategori.kategori }}
                                    </th>
                                    <td class="px-6 py-4">
                                        <!-- edit -->
                                        <button @click="btnEditeKategori(kategori.id, kategori.kategori)" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <box-icon type='solid' name='edit' color="blue"></box-icon>
                                        </button> |
                                        <!-- delete -->
                                        <button @click="btnDeleteKategori(kategori.id)" type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline">
                                            <box-icon type='solid' name='eraser' color="red"></box-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

             </div>

             <!-- paginate kategori -->
             <div @click="nextPageKategori" class="mt-4 w-[150px] mx-auto flex flex-row justify-center">
                <span class="mr-2 btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                    Prev
                </span>
                <span @click="prevPageKategori" class="btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                    Next
                </span>
            </div>
             <!-- paginate kategori -->
         </div>

        <!-- ketegori for pastor -->
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            token: "",
            confirmDelete: false,
            add: false,
            messageToast: "",
            showToast: false,
            isIconToast: false,

            allUser: [],
            addUser: {
                    role_id: 0,
                    active_id: 0,
                    name: "",
                    email: "",
                    password: "",
                    gereja_id: 0,
                    alamat: "",
                    no_hp: "",
                    photo_user: "",
                },
            
            idSelect: 0,
            data_editUser: {},
            btn_edit_or_addUser: true,

            // church
            allChurch: [],

            // search
            search: "",
            // pagination
            currentPage: 1,
            lastPage: 0,

            // kategori
            allKategori: [],
            searchKategori: '',
            currentPageKategori: 1,
            lastPageKategori: 0,
            nameKategori: "",
            kategoriForm: false,
            validateBtn: true,

            // kategori for update
            idKategori: 0,
            deleteKategori: false,
        }
    },

    mounted() {
        this.token = localStorage.getItem('token');

        this.fetchUser();
        this.getAllChurch();
        this.fetchKategoriPastor();
    },


    watch: {
        search(newValue, oldValue) {
            this.fetchUser(newValue); // Panggil fetchUsers dengan searchQuery baru
        },
        searchKategori(newValue){
            this.fetchKategoriPastor(newValue);
        }

    },

    methods: {

        fetchUser(query = '') {
            axios.get('http://e-consultationbe.test/api/search_user', {
                params: {
                    query: query,
                    page: this.currentPage,
                },
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(response => {
                this.allUser = response.data.data.data; // Mengambil data pengguna dari respons API
                
                console.log(this.allUser);
                this.currentPage = response.data.data.current_page; // Menyimpan first page data pagination
                this.lastPage = response.data.data.last_page; // Menyimpan data last page pagination
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
            
        },

        nextPage() {
            if(this.currentPage < this.lastPage){
                this.currentPage++;
            } 
            this.fetchUser()
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.fetchUser()
        },

        getAllChurch: async function() {

            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                };

                const responseAllChurch = await axios({
                    method: 'get',
                    url: 'http://e-consultationbe.test/api/church',
                    headers: headers
                });

                this.allChurch = responseAllChurch.data.data.data
            } catch (error) {
                console.log('Error : ', error);
            }

        },

        handleFileChange: function(e) {
            this.addUser.photo_user = e.target.files[0];
        },

        async editUser(id) {
            this.btn_edit_or_addUser = false;
            this.add = true;

            this.idSelect = id

            try {
                const dataEditUser = await axios.get(`http://e-consultationbe.test/api/profile_user/${this.idSelect}`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
                this.data_editUser = dataEditUser;
                this.addUser.role_id = dataEditUser.data.data.role_id;  
                this.addUser.active_id = dataEditUser.data.data.active_id;
                this.addUser.name = dataEditUser.data.data.name;
                this.addUser.email = dataEditUser.data.data.email;
                this.addUser.gereja_id = dataEditUser.data.data.gereja_id;
                this.addUser.alamat = dataEditUser.data.data.alamat;
                this.addUser.no_hp = dataEditUser.data.data.no_hp;
                console.log(this.data_editUser);
            } catch (error) {
                console.log(error);
            }

        },

        async btn_editUser() {
            
            let formData = new FormData();

            formData.append("role_id", this.addUser.role_id);
            formData.append("name", this.addUser.name);
            formData.append("email", this.addUser.email);
            formData.append("photo_user", this.addUser.photo_user);
            formData.append("gereja_id", this.addUser.gereja_id);
            formData.append("alamat", this.addUser.alamat);
            formData.append("no_hp", this.addUser.no_hp);
            formData.append("active_id", this.addUser.active_id);
            formData.append("_method", "PATCH");

            await axios.post(`http://e-consultationbe.test/api/profile_user/${this.idSelect}`, formData, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                alert(response.data.message)
                this.fetchUser();
            }).catch((error) => {
                console.log(error)
            })
            
            this.btnCloseUser();
            this.clearDataUser();
        },

        async nambahinUser(){

            let formData = new FormData();

            formData.append("role_id", this.addUser.role_id);
            formData.append("name", this.addUser.name);
            formData.append("email", this.addUser.email);
            formData.append("password", this.addUser.password);
            formData.append("photo_user", this.addUser.photo_user);
            formData.append("gereja_id", this.addUser.gereja_id);
            formData.append("alamat", this.addUser.alamat);
            formData.append("no_hp", this.addUser.no_hp);

            await axios.post('http://e-consultationbe.test/api/adduser',formData , {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                this.showToast = true;
                this.messageToast = response.data.message;
                this.isIconToast = true;
                setTimeout(() => {
                    this.showToast = false;
                }, 2000)
            }).catch((error) => {
                console.log('Error', error.response);
                this.showToast = true;
                this.isIconToast = false;
                this.messageToast = error.response.data.message;
                setTimeout(() => { this.showToast = false}, 8000);
            });
            
            this.btnCloseUser();
            this.fetchUser();
        },

        async deleteUser(){

            await axios.delete(`http://e-consultationbe.test/api/delete_user/${this.idSelect}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                alert(response.data.message);
                this.fetchUser();
                this.btnCloseDelete()
            }).catch((error) => {
                console.log(error);
            });

        },

        clearDataUser() {
            this.addUser.role_id = 0;
            this.addUser.name = "";
            this.addUser.email = "";
            this.addUser.password = "";
            this.addUser.gereja_id = 0;
            this.addUser.alamat = "";
            this.addUser.no_hp = "";
            this.idSelect = 0;
        },

        btnConfirmDelete: function (id) {
            this.confirmDelete = true;
            this.idSelect = id
            
        },

        btnCloseDelete: function () {
            this.confirmDelete = false;
            this.clearDataUser()
        },
        
        btnAddUser: function () {
            this.add = true;
            this.btn_edit_or_addUser = true;
        },
        
        btnCloseUser: function () {
            this.add = false;
            this.clearDataUser();
        },
        closeToast: function ()
        {
            this.showToast = false
        },


        nextPageKategori() {
            if(this.currentPageKategori < this.lastPageKategori){
                this.currentPageKategori++;
            } 
            this.fetchKategoriPastor()
        },

        prevPageKategori() {
            if (this.currentPageKategori > 1) {
                this.currentPageKategori--;
            }
            this.fetchKategoriPastor()
        },

        // kategori pastor
        fetchKategoriPastor: async function(kategori)
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                }

                const params = {
                    kategori: kategori,
                    page: this.currentPageKategori
                }

                const response = await axios({
                    method: 'get',
                    url: 'http://e-consultationbe.test/api/kategori/pastor',
                    headers: headers,
                    params: params,
                });

                console.log(response.data.data);
                
                this.allKategori = response.data.data.data;
                this.currentPageKategori = response.data.data.current_page;
                this.lastPageKategori = response.data.data.last_page;
            } catch (error) {
                console.log('Error', error);
                
            }

        },

        btnAddKategori: function() {
            this.kategoriForm = true;
            this.validateBtn= true;
        },
        btnEditeKategori: function(id, kategori)
        {
            this.kategoriForm = true;
            this.validateBtn = false;
            this.idKategori = id;
            this.nameKategori = kategori;
        },
        btnCancelKategori: function() {
            this.kategoriForm = false;
            this.clearFormKategori();
        },
        clearFormKategori: function() {
            this.nameKategori = "";
            this.idKategori = 0;
        },
        btnCloseDeleteKategori: function()
        {
            this.deleteKategori = false;
            this.idKategori = 0;
        },
        btnDeleteKategori: function(id)
        {
            this.deleteKategori = true;
            this.idKategori = id;
        },
        addKategoriPastor: async function()
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                }

                const dataAddKategori = {
                    kategori: this.nameKategori
                };

                const response = await axios({
                    method: 'post',
                    url: 'http://e-consultationbe.test/api/kategori/pastor',
                    headers: headers,
                    data: dataAddKategori
                });

                console.log(response.data);
                alert(response.data.message);
                this.fetchKategoriPastor();
            } catch (error) {
                console.log('error', error);
            }

            this.btnCancelKategori();
            this.clearFormKategori();
        },
        confirmBtnEditKategori: async function()
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                }

                const dataUpdate = { kategori: this.nameKategori}

                const response = await axios({
                    method: 'patch',
                    url: `http://e-consultationbe.test/api/kategori/pastor/${this.idKategori}`,
                    headers: headers,
                    data: dataUpdate,
                });

                alert(response.data.message);
                this.fetchKategoriPastor();
                this.btnCancelKategori();
            } catch (error) {
                console.log('error', error);
                
            }
        },
        confirmBtnDeleteKategori: async function ()
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                }
                
                const response = await axios({
                    method: 'delete',
                    url: `http://e-consultationbe.test/api/kategori/pastor/${this.idKategori}`,
                    headers: headers
                })

                alert(response.data.message);
                this.fetchKategoriPastor();
                this.btnCloseDeleteKategori();
            } catch (error) {
                console.log('error');
            }
        }

    }
}
</script>
<style scoped>
    
</style>