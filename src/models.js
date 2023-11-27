class WSpeticionResponse{
    constructor(qr, estado, message, otros){
        this.qr =qr
        this.estado = estado
        this.message = message
        this.otros = otros
    }   
    estado(jsonData){
        console.log(jsonData)
    }
}