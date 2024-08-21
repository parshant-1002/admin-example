interface QrCodeProps {
  qrCode: string;
}
function QrCode({ qrCode }: QrCodeProps) {
  return (
    <div className="w-100 bg-white p-4">
      <div className="text-center title_group  justify-content-center pb-3">
        <p className="p ">
          Scan the qr code to get the authentication code on your authentication
          app
        </p>
        <img src={qrCode} alt="qrCode" width="80%" />
      </div>
    </div>
  );
}

export default QrCode;
