<script>
import DetailPastor from '@/views/DetailPastor.vue';
import Profile from '@/views/Profile.vue';
import axios from 'axios';

    export default {
      data() {
        return {
            token: '',
            idUser: 0,
            add: false,
            editPastored: false,
            role: {},
            data: {},
            church: {},
            detailPastor: {},
            allChurch: [],

            addUser: {
                    name: "",
                    email: "",
                    gereja_id: 0,
                    alamat: "",
                    no_hp: "",
                    photo_user: "",
                    roleid: "",
                    activeid: "",
            },
            editPastor: {
                idDetail: 0,
                status_pekerjaan: "",
                spesialisasi: "",
                biografi: "",
                pengalaman: "",
                jadwal: "",
            },

            // pastor
            validateBtnPastorDetail: true,

            // kategori pastor
            allKategori: [],
            kategori_check: [],
        }
      },
      created(){
        this.token = localStorage.getItem('token');
        const roleData = localStorage.getItem('role');
        if(roleData){
            this.role = JSON.parse(roleData);
        }
      },
      mounted(){
        this.profileUser();
        this.getAllChurch();
        this.fetchKategoriPastor();
      },
      methods: {
        profileUser: async function() {
            try {
                const headers = {
                    'Authorization' : `Bearer ${this.token}`,
                };

                const response = await axios({
                    method: 'get',
                    url: 'http://e-consultationbe.test/api/me',
                    headers: headers
                });
                
                console.log(response.data.data);
                // user
                this.idUser = response.data.data.id;
                this.addUser.name = response.data.data.name;
                this.addUser.email = response.data.data.email;
                this.addUser.gereja_id = response.data.data.gereja_id;
                this.addUser.alamat = response.data.data.alamat;
                this.addUser.no_hp = response.data.data.no_hp;
                this.church = response.data.data.chruch;
                this.addUser.roleid = response.data.data.role_id;
                this.addUser.activeid = response.data.data.active_id;
                
                
                // pastor
                if(response.data.data.is_pastor){
                    this.detailPastor = response.data.data.detail_pastor;
                    this.editPastor.idDetail = response.data.data.detail_pastor.id;
                    this.editPastor.status_pekerjaan = response.data.data.detail_pastor.status_pekerjaan;
                    this.editPastor.spesialisasi = response.data.data.detail_pastor.spesialisasi;
                    this.editPastor.biografi = response.data.data.detail_pastor.biografi;
                    this.editPastor.pengalaman = response.data.data.detail_pastor.pengalaman;
                    this.editPastor.jadwal = response.data.data.detail_pastor.jadwal;
                    this.validateBtnPastorDetail = true; //update
                }else{
                    this.validateBtnPastorDetail = false; //submit
                }

            } catch (error) {
                console.log('Error', error);
                
            }
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
        btnCloseUser: function () {
            this.add = false;
            this.clearDataUser();
        },
        btnEdit: function () {
            this.add = true;
        },
        async btn_editUser() {
            
            let formData = new FormData();

            formData.append("active_id", this.addUser.activeid);
            formData.append("role_id", this.addUser.roleid);
            formData.append("name", this.addUser.name);
            formData.append("email", this.addUser.email);
            formData.append("photo_user", this.addUser.photo_user);
            formData.append("gereja_id", this.addUser.gereja_id);
            formData.append("alamat", this.addUser.alamat);
            formData.append("no_hp", this.addUser.no_hp);
            formData.append("_method", "PATCH");

            await axios.post(`http://e-consultationbe.test/api/profile_user/${this.idUser}`, formData, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                alert("Succes update profile data")
                this.profileUser();
            }).catch((error) => {
                console.log(error)
            })
            
            this.btnCloseUser();
        },
        btnCloseUser: function () {
            this.add = false;
        },
        btnEditPastor: function () {
            this.editPastored = true;
        },
        btnClosePastor: function () {
            this.editPastored = false;
        },
        btn_createDetailPastor: async function ()
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                };

                const kategoriString = this.kategori_check.join(', ');

                const data = {
                    user_id : this.idUser,
                    status_pekerjaan: this.editPastor.status_pekerjaan,
                    spesialisasi: kategoriString,
                    biografi: this.editPastor.biografi,
                    pengalaman: this.editPastor.pengalaman,
                    jadwal: this.editPastor.jadwal,
                }

                const response = await axios({
                    method: 'post',
                    url: 'http://e-consultationbe.test/api/pastor/',
                    headers: headers,
                    data: data
                });

                alert(response.data.message);
                this.profileUser();
                this.btnClosePastor();
            } catch (error) {
                
            }
        },
        btn_editDetail: async function () {
            try {
            const headers = {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            };

            const kategoriString = this.kategori_check.join(', ')

            const dataToUpdate = {
                user_id : this.idUser,
                status_pekerjaan: this.editPastor.status_pekerjaan,
                spesialisasi: kategoriString,
                biografi: this.editPastor.biografi,
                pengalaman: this.editPastor.pengalaman,
                jadwal: this.editPastor.jadwal,
            };

            const response = await axios({
                method: 'patch',
                url: `http://e-consultationbe.test/api/pastor/${this.editPastor.idDetail}`,
                headers: headers,
                data: dataToUpdate,
            });

                console.log(response.data);
                alert(response.data.message);
                this.profileUser();
                this.btnClosePastor();
            }catch(error) {
                console.log('Error', error);
            }

        },
        // kategori pastor
        fetchKategoriPastor: async function()
        {
            try {
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                }

                // const params = {
                //     kategori: kategori,
                //     page: this.currentPageKategori
                // }

                const response = await axios({
                    method: 'get',
                    url: 'http://e-consultationbe.test/api/kategori/pastor',
                    headers: headers,
                });
                
                this.allKategori = response.data.data.data;
                // this.currentPageKategori = response.data.data.current_page;
                // this.lastPageKategori = response.data.data.last_page;
            } catch (error) {
                console.log('Error', error);
            }

        },

      }
    }
</script>

<template>
    <h1 class="text-2xl font-semibold mb-4 flex flex-row">Profile</h1>

    <div class="">
        <div class="flex gap-5">
            <h3 class="flex gap-5">Nama <span>: {{ addUser.name }}</span></h3>
        </div>
        <div class="flex gap-5">
            <h3 class="flex gap-5">Email <span>: {{ addUser.email }}</span></h3>
        </div>
        <div class="flex gap-5">
            <h3 class="flex gap-5">Gereja <span>: {{ church?.nama_gereja }}</span></h3>
        </div>
        <div class="flex gap-5">
            <h3 class="flex gap-5">Alamat <span>: {{ addUser.alamat }}</span></h3>
        </div>
        <div class="flex gap-5">
            <h3 class="flex gap-5">No.Hp <span>: {{ addUser.no_hp }}</span></h3>
        </div>
        <button @click="btnEdit" type="button" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-8 mt-4 py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Edit Profile</button>
    </div>

    <!-- jika user pastor -->
    <div v-if="role.isPastor" class="mt-8">
        <h1 class="text-2xl font-semibold mb-4 flex flex-row">Detail pastor</h1>
    
            <div class="flex gap-5">
                <div class="">
                    <h3>Status Pekerjaan</h3>
                    <h3>Spesialisasi</h3>
                    <h3>Biografi</h3>
                    <h3>Pengalaman</h3>
                    <h3>Jadwal</h3>
                </div>
                <div class="">
                    <p>: {{ detailPastor?.status_pekerjaan }}</p>
                    <p>: {{ detailPastor?.spesialisasi }}</p>
                    <p>: {{ detailPastor?.biografi }}</p>
                    <p>: {{ detailPastor?.pengalaman }}</p>
                    <p>: {{ detailPastor?.jadwal }}</p>
                </div>
            </div>
        <button @click="btnEditPastor" type="button" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-8 mt-4 py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Edit detail</button>
    </div>
    <!-- jika user pastor -->

    <!-- forms profile -->
    <div v-if="add" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div class="absolute top-1/2 left-1/2 bg-white p-6 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-2xl w-10/12 h-4/5">

            <form @submit.prevent>
                <!-- Name -->
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="addUser.name" type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>
                <!-- Name -->

                <!-- email -->
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="addUser.email" type="email" name="email_user" id="email_user" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="email_user" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <!-- email -->

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
                    <button @click="btn_editUser" type="submit" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Submit</button>
                    <button @click="btnCloseUser" type="button" class=" text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center ">Cancel</button>
                </div>
            </form>

        </div>
    </div>
    <!-- forms profile -->

    <!-- forms detail pastor -->
    <div v-if="editPastored" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div class="absolute top-1/2 left-1/2 bg-white p-6 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-2xl w-10/12 h-4/5">

            <form @submit.prevent>
                <!-- status pekerjaan -->
                <div class="relative z-0 w-full mb-3 group">
                    <input v-model="editPastor.status_pekerjaan" type="text" name="status pekerjaan" id="status pekerjaan" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="status pekerjaan" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Status Pekerjaan</label>
                </div>
                <!-- status pekerjaan -->

                <!-- spesialisasi -->
                 <div class="flex border rounded-md flex-wrap my-2 px-3 py-5 ">
                     <div v-for="(kategori, index) in allKategori" :key="index" class="flex items-center me-4">
                         <input v-model="kategori_check" :id="'kategori_'+index" type="checkbox" :value="kategori.kategori" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                         <label :for="'kategori_'+index" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ kategori.kategori }}</label>
                     </div>
                 </div>
                <!-- spesialisasi -->

                <!-- biografi -->
                <div class="relative z-0 w-full mb-3 group">
                    <textarea v-model="editPastor.biografi" id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900" placeholder="Biografi..."></textarea>
                </div>
                <!-- biografi -->

                <!-- Pengalaman -->
                <div class="relative z-0 w-full mb-3 group">
                    <textarea v-model="editPastor.pengalaman" id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900" placeholder="Pengalaman"></textarea>
                </div>
                <!-- Pengalaman -->

                <!-- Jadwal -->
                <div class="relative z-0 w-full mb-3 group">
                    <textarea v-model="editPastor.jadwal" id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900" placeholder="Jadwal..."></textarea>
                </div>
                <!-- Jadwal -->

                <div class="w-full flex gap-3 justify-center">
                    <button v-if="validateBtnPastorDetail" @click="btn_createDetailPastor" type="submit" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Submit</button>
                    <button v-else @click="btn_editDetail" type="submit" class=" text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center dark:bg-blue-900 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Update</button>
                    <button @click="btnClosePastor" type="button" class=" text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm sm:w-auto w-28 md:w-2/6  py-2 text-center ">Cancel</button>
                </div>
            </form>

        </div>
    </div>
    <!-- forms detail pastor -->
</template>