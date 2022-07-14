<template>
  <div class="connect-wallet-layout">
    <div class="container">
      <h1 class="align-center">This is an connect wallet page</h1>
      <div class="align-center">
        <el-button :loading="loading" @click="fakeConnect">Connect</el-button>
        <el-button @click="connectPhantom">Connect Phantom</el-button>
        <el-button @click="disconnectPhantom">Disconnect</el-button>
        <el-button @click="transferSOL">Transaction</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Buffer } from 'buffer';
window.Buffer = Buffer;
//import { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
//import * as web3 from '@solana/web3.js'; //console.log(web3);
import { Connection, clusterApiUrl, PublicKey, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import { mapActions } from 'vuex';
const {solana} = window;

const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open('https://phantom.app/', '_blank');
};

export default {
  data(){
    return {
      loading: false,
      redirect: undefined,
      publicWalletAddress: ''
    }
  },

  computed: {
    isPhantom(){
      return solana?.isPhantom;
    },

    provider(){
      return getProvider();
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  mounted() {
    this.getConnectInfo();
  },

  methods: {
    ...mapActions({
      login: 'users/login'
    }),

    async transferSOL() {
      const amount = 0.1;
      const commitment = 'confirmed';
      // Detecing and storing the phantom wallet of the user (creator in this case)
      var provider = this.provider;
      console.log("Public key of the emitter: ", provider.publicKey.toString());

      // Establishing connection
      const connection = new Connection(clusterApiUrl('testnet'), commitment)

      // Airdrop some SOL to the sender's wallet, so that it can handle the txn fee
      // var airdropSignature = await connection.requestAirdrop(
      //   provider.publicKey,
      //   LAMPORTS_PER_SOL,
      // );

      // // Confirming that the airdrop went through
      // await connection.confirmTransaction(airdropSignature);
      // console.log("Airdropped");

      try{
        var transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: new PublicKey("DzB8PMoXt4XQrYyfBQpLb2ivwA3f4Srp2McknvDpPVuH"),
            lamports: (amount*LAMPORTS_PER_SOL) //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
          }),
        );
        
        // Setting the variables for the transaction
        transaction.feePayer = await provider.publicKey;
        //let blockhashObj = await connection.getRecentBlockhash();
        let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
        transaction.recentBlockhash = blockhash;

        // Transaction constructor initialized successfully
        if(transaction) {
          console.log("Txn created successfully");
        }
        
        // Request creator to sign the transaction (allow the transaction)
        let signed = await provider.signTransaction(transaction);
        // The signature is generated
        let signature = await connection.sendRawTransaction(signed.serialize());
        // Confirm whether the transaction went through or not
        await connection.confirmTransaction(signature);

        //Signature chhap diya idhar
        console.log("Signature: ", signature);
      }catch(error){
        console.log(error);
      };
    },

    async getConnectInfo(){
      //const provider = this.provider;
      this.provider.connect({ onlyIfTrusted: true })
        .then(({ publicKey }) => {
            // Handle successful eager connection
            console.log(publicKey.toString())
        }).catch((error) => {
          console.log(error);
            // Handle connection failure as usual
        })


      //console.log(provider.publicKey.toString());
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
      //console.log(provider.isConnected);
      // true
    },

    async connectPhantom(){
      const provider = this.provider;
      try {
          const resp = await provider.connect();
          console.log(resp.publicKey.toString());
      } catch (err) {

      }
    },

    async disconnectPhantom(){
      console.log(this.provider)
      this.provider.disconnect();
    },

    fakeConnect(){
      this.loading = true;
      this.login({email: 'tai.ictu@gmail.com', password: 'stdev@123456'}).then( res => {
        console.log(res)
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false;
      }).catch( error => {
        console.log(error)
        this.loading = false;
      })
    }
  }
}
</script>
