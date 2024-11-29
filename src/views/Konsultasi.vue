<template>
    <div class="mb-8 mt-24 mx-8 h-full box-border">
        
        <div class="px-10 pb-6 flex justify-center">
            <div class="flex items-center mb-8 gap-3">
                <box-icon size="lg" type='solid' name='conversation'></box-icon>
                <h1 class="text-xl font-bold">Consultation</h1>
            </div>
        </div>

        <div class="w-5/6 mx-auto">

            <!-- chat bubble -->

            <div class="hidden">
                <div class="flex items-end gap-2.5 my-2">
                    <img class="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="@/assets/img/4.png" alt="Jese image">
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>

                </div>
            </div>

            <div v-for="message in allMessageUser" :key="message.id" class="">
                <div :class="message.sender_name == validateUsername ? 'flex-row-reverse' : ''" class="flex items-end  gap-2.5 my-2">
                    <!-- <img :class="message.sender_name == validateUsername ? 'ring-blue-300 dark:ring-blue-500' : 'ring-gray-300 dark:ring-gray-500'" class="w-8 h-8 p-1 rounded-full ring-2 " src="@/assets/img/6.png" alt="Jese image"> -->
                    <div :class="message.sender_name == validateUsername ? 'bg-blue-100': 'bg-gray-100' " class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200  rounded-xl dark:bg-gray-700">
                        <div class="flex items-center space-x-2 rtl:space-x-reverse">
                            <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ message.sender_name }}</span>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ formatDate(message.createdAt) }}</span>
                        </div>
                        <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ message.text }}</p>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>

                </div>
            </div>

            <!-- chat bubble -->
             
            <!-- button chat -->
            <div class="my-10">
                <form @submit.prevent>   
                    <label for="message" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Write something</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        </div>
                        <input v-model="text" type="message" id="message" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-400 focus:border-green-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-400 dark:focus:border-green-400" placeholder="Write something" required />
                        <button v-if="isBtnFirebase" @click="sentMessageForFb" type="button" class="absolute end-2.5 bottom-2.5 px-4 py-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm text-center">send</button>
                        <button v-else @click="sentMessage" type="button" class="absolute end-2.5 bottom-2.5 px-4 py-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm text-center">send</button>
                    </div>
                </form>
            </div>
            <!-- button chat -->
        </div>


        <div class="hidden w-full h-[480px] justify-center items-center bg-slate-50">
            <h1>No have Consultation</h1>
        </div>

    </div>
</template>

<script>
import axios from 'axios';


    export default {
        props: ['id'],
        data(){
            return {
                token: '',
                text: '',
                allMessage: [],
                allUserFirebase: [],
                userFirebase: {},
                datafireBase: '',

                isBtnFirebase: false,
                validateUsername: '',
                validateReceivername: '',

                // data for firebase
                collecction_message: {
                    nama_receiver: '',
                    nama_sender: '',
                    receiver_id: 0,
                    sender_id: 0,
                },

                idDoc: '',
                allMessageUser: {},
                validUser: {},
            }
        },

        created()
        {
            this.token = localStorage.getItem('token');
            this.fetchAllMessage();
        },
        mounted() {
            this.getAllDataFromFirebase();
            this.profileUser();
        },

        methods: {

            // cek nama user
            profileUser: async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const user = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/me',
                        headers: headers
                    });

                    console.log(user.data.data.name);
                    this.validateUsername = user.data.data.name


                } catch (error) {
                    
                }

            },

            // pertama cek dulu apakah user sudah pernah melakukan chat dengan pastor dengan ngecek di laravel, jika berhasil tombol send berubah ke send firebase, jika belom maka akan send ke laravel dan send juga ke firebase sekaligus
            fetchAllMessage : async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const response = await axios({
                        method: 'get',
                        url: `http://e-consultationbe.test/api/consultation/${this.id}`,
                        headers: headers
                    });

                    // console.log(response.data.data[0]);
                    this.allMessage = response.data.data;

                    // jika berhasil maka akan mengambil receivername dan sender name terlebih dahulu
                    this.validateReceivername = response.data.data[0].receiver.name;

                    // buat firebase
                    this.isBtnFirebase = true;
                    this.validateUsernameInFirebase(this.allUserFirebase, this.validateUsername, this.validateReceivername);
                    this.getAllMessageUserFireStore();

                } catch (error) {
                    console.log('Error', error);
                    this.isBtnFirebase = false;
                }
            },

            getAllDataFromFirebase : async function () {
                const myThis = this;
                try {
                    await this.$root.onSnapshot(this.$root.collection(this.firestoredb, 'messages'),
                            (response) => {
                                const allDoc = response.docs.map(doc => ({id: doc.id, ...doc.data()}));
                                // console.log(allDoc);
                                
                                myThis.allUserFirebase = allDoc;

                        },
                        (error) => {
                            console.log(error);
                        }
                    );

                
                } catch (error) {
                    console.log('Error', error);
                }

            },

            getAllMessageUserFireStore : async function () {
                try {
                    if (!this.idDoc) {
                        console.error("Conversation ID is not set!");
                        return;
                    }

                    const myThis = this;
                    const messagesRef = this.$root.collection(this.firestoredb, `messages/${this.idDoc}/message`);
                    const orderedQuery = this.$root.query(messagesRef, this.$root.orderBy("createdAt", "asc"));
                    
                    this.$root.onSnapshot(orderedQuery, 
                        (response) => {
                            const allDoc = response.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data(),
                                createdAt: doc.data().createdAt.toDate()
                            }));
                            console.log(allDoc);
                            
                            myThis.allMessageUser = allDoc;
                            
                        },
                        error => console.log(error)
                    );

                } catch (error) {
                    console.log('Error', error);  
                }
            },

            // sort hasil fetch all message dari firebase mengunakan konsep ascending

            validateUsernameInFirebase : function (allUserFirebase, validateUsername, validateReceivername) {
                const userFirebase = allUserFirebase.find(user => user.nama_sender == validateUsername || user.nama_receiver == validateReceivername);
                // console.log(userFirebase);
                this.validUser = userFirebase;
                this.idDoc = userFirebase.id;
            },

            createSubcollectionMessage : async function () {

                try {
                    if(!this.idDoc){
                        console.error("Conversation ID is not set!");
                        return;
                    }

                    const sub_colletcion = await this.$root.addDoc(this.$root.collection(this.firestoredb, `messages/${this.idDoc}/message`), {
                        text: this.text,
                        sender_name: this.collecction_message.nama_sender,
                        createdAt: new Date()
                    });

                    this.clearText();
                    this.getAllMessageUserFireStore();
                } catch (error) {
                    console.error("Error adding message: ", e);
                }

            },

            setupDataForCollectionMessage: function (data) {
                this.collecction_message.nama_receiver = data.nama_receiver;
                this.collecction_message.nama_sender = data.nama_sender;
                this.collecction_message.receiver_id = data.receiver_id;
                this.collecction_message.sender_id = data.sender_id;
            },

            createCollectionMessage: async function () {

                if(
                    this.collecction_message.nama_receiver == null &&
                    this.collecction_message.nama_sender == null &&
                    this.collecction_message.receiver_id == null &&
                    this.collecction_message.sender_id == null
                ) return alert('Message not sent, please resend message!')

                try {

                    const docRef = await this.$root.addDoc(this.$root.collection(this.firestoredb, 'messages'), { 
                        nama_receiver : this.collecction_message.nama_receiver,
                        nama_sender : this.collecction_message.nama_sender,
                        receiver_id : this.collecction_message.receiver_id,
                        sender_id : this.collecction_message.sender_id
                    })

                    this.idDoc = docRef.id;
                    this.isBtnFirebase = true;
                    // console.log('Berhasil membuat data message');
                    this.createSubcollectionMessage();

                } catch (error) {
                    console.log('Error : ' + error);
                    
                }
            },


            sentMessage : async function ()
            {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };
    
                    const data = {
                        text : this.text,
                        receiver_id: this.id
                    };
    
                    const response = await axios({
                        method: 'post',
                        url: 'http://e-consultationbe.test/api/consultation',
                        headers: headers,
                        data: data
                    });

                    const collection = {
                        nama_receiver: response.data.data.receiver.name,
                        nama_sender: response.data.data.sender.name,
                        receiver_id: response.data.data.receiver_id,
                        sender_id: response.data.data.sender_id,
                    }

                    this.setupDataForCollectionMessage(collection);
                    // jalankan firebase sekaligus
                    this.createCollectionMessage();

                    this.fetchAllMessage();
                } catch (error) {
                    console.log('Error', error);
                    
                }
            },

            sentMessageForFb : async function ()
            {
                try {
                    if(!this.idDoc){
                        console.error("Conversation ID is not set!");
                        return;
                    }

                    const sub_colletcion = await this.$root.addDoc(this.$root.collection(this.firestoredb, `messages/${this.idDoc}/message`), {
                        text: this.text,
                        sender_name: this.validateUsername,
                        createdAt: new Date()
                    });

                    this.clearText();
                    this.getAllMessageUserFireStore();
                } catch (error) {
                    console.error("Error adding message: ", e);
                }
            },

            formatDate(date) {
                if (!(date instanceof Date)) {
                    date = new Date(date); // Pastikan data yang masuk berupa Date
                }
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Ubah ke format string yang lebih terbaca
            },

            formatTime (time)
            {
                const date = new Date(time); // Konversi string ke objek Date
                const hours = date.getUTCHours().toString().padStart(2, '0'); // Ambil jam dan pastikan 2 digit
                const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Ambil menit dan pastikan 2 digit
                const resultTime = `${hours}:${minutes}`; // Format jam dan menit
                return resultTime;
            },

            clearText : function ()
            {
                this.text = '';
            }
        }
    }
</script>