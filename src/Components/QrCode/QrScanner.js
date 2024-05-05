import { QrReader } from 'react-qr-reader';
import { PunchInEmployee } from '../../Services/PunchIn.service';
import { PunchOutEmployee } from '../../Services/PunchOut.service';

const QrScanner = ({ open, punchOut }) => {
    const handleError = error => {
        console.error('QR Scan Error:', error);
    };
    const onResult = async result => {
        if (result) {
            if (!punchOut) {
                console.log(result?.text)
                const punchInResponse = await PunchInEmployee(result?.text)
                const punchInData = await punchInResponse.json();
                console.log('punchInData', punchInData)
            } else {
                console.log(result?.text)
                const punchOutResponse = await PunchOutEmployee(result?.text)
                const punchOutData = await punchOutResponse.json();
                console.log('punchOutData', punchOutData)
            }
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
