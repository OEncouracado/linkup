import efipay from "../hook/efipayConfig";

export const createCharge = async (body: any) => {
    try {
        const response = await efipay.createCharge({}, body);
        return response;
    } catch (error) {
        console.error('Error creating charge:', error);
        throw error;
    }
};