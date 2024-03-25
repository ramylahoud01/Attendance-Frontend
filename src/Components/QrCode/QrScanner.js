import { QrReader } from 'react-qr-reader';
import { PunchInEmployee } from '../../Services/PunchIn.service';

const QrScanner = ({ open }) => {
    const handleError = error => {
        console.error('QR Scan Error:', error);
    };
    const onResult = async result => {
        if (result) {
            console.log(result?.text)
            const punchInResponse = await PunchInEmployee(result?.text)
            const punchInData = await punchInResponse.json();
            console.log('punchInData', punchInData)
        }
    };
    return (
        <div style={{ width: '200px' }}>
            {open && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onResult={onResult}
                    style={{ width: '100%' }}
                />
            )}
        </div>
    );
};

export default QrScanner;
