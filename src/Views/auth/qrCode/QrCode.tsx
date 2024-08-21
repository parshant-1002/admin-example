import './QrCode.scss';

interface QrCodeProps {
  qrCode: string;
}
function QrCode({ qrCode }: QrCodeProps) {
  return (
    <div className="qrSec w-100 bg-white pt-3">
      <div className="form-content text-center justify-content-center p-0">
        <p className="p form-disc">
          Scan the qr code to get the authentication code on your authentication
          app
        </p>
        <img src={qrCode} alt="qrCode" width="80%" />
      </div>
    </div>
  );
}

export default QrCode;
