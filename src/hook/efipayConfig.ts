import EfiPay from 'sdk-typescript-apis-efi';

const options = {
    sandbox: true, // Use false para produção
    client_id: 'Client_Id_60eecfa1223837a54a06e9b0b4d40230f4de3e11',
    client_secret: 'Client_Secret_0d0f0096f17099f81d5ac39f627f571a87fdf953',
    // pix_cert: 'caminhoAteOCertificadoPix.p12'
};

const efipay = new EfiPay(options);

export default efipay;
