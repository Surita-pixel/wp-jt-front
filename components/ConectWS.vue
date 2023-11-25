<template>
    <div>
        <h1>Vue WebSocket Example</h1>
        <div v-if="connected">
            <form @submit.prevent="submitForm">
                <input type="text" id="message" v-model="message" />
                <button type="submit">Enviar Mensaje al Servidor</button>
            </form>
            <p v-text="mensajeServer"></p>
            <h2>
                contactos
            </h2>
            <div class="contactos">

            </div>
        </div>
        <div v-else>
            <p>No conectado al servidor WebSocket</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const connected = ref(false);
const mensajeServer = ref("")
const contacts = ref([])
let contactsLimit = 10
let socket = null;

const connectWebSocket = () => {
    // Reemplaza 'ws://tu-servidor-websocket-url' con la URL real de tu servidor WebSocket
    socket = new WebSocket('ws://158.220.116.166:8099');

    socket.onopen = () => {
        console.log('Conexión establecida');
        connected.value = true;
    };

    socket.onmessage = (event) => {
        mensajeServer.value = event.data
        console.log('Mensaje del servidor:', event.data);
        // Manejar el mensaje recibido del servidor según tus necesidades
    };

    socket.onclose = () => {
        console.log('Conexión cerrada');
        connected.value = false;
    };
};

const sendMessage = () => {
    if (socket && connected.value && message.value.trim() !== '') {
        // Enviar el mensaje al servidor
        socket.send(JSON.stringify({"message":message.value}));
        // Puedes restablecer el campo del formulario después de enviar el mensaje
        message.value = '';
    }
};
const getContacts =(limit)=>{
    let mensajeContactos = {"message":"obtenerContactos", "limit":limit}
    socket.send(JSON.stringify(mensajeContactos))
}

const submitForm = () => {
    sendMessage();
};

// Conecta al WebSocket cuando el componente se monta
onMounted(() => {
    connectWebSocket();
});

// Cierra la conexión WebSocket antes de que el componente se destruya
onBeforeUnmount(() => {
    if (socket) {
        socket.close();
    }
});
</script>
<style></style>