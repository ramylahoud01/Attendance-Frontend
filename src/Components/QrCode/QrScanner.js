import { QrReader } from 'react-qr-reader';
import { PunchInEmployee } from '../../Services/PunchIn.service';
import { PunchOutEmployee } from '../../Services/PunchOut.service';
import { BreakInEmployee } from '../../Services/BreakIn.service';
import { BreakOutEmployee } from '../../Services/BreakOut.service';

const QrScanner = ({ open, punchOut, punchIn, breakIn, breakOut }) => {
    const handleError = error => {
        console.error('QR Scan Error:', error);
    };
    const onResult = async result => {
        if (result) {
            if (punchIn) {
                console.log(result?.text)
                const punchInResponse = await PunchInEmployee(result?.text)
                const punchInData = await punchInResponse.json();
                console.log('punchInData', punchInData)
            } else if (punchOut) {
                console.log(result?.text)
                const punchOutResponse = await PunchOutEmployee(result?.text)
                const punchOutData = await punchOutResponse.json();
                console.log('punchOutData', punchOutData)
            } else if (breakIn) {
                console.log(result?.text)
                const breakInResponse = await BreakInEmployee(result?.text)
                const breakInData = await breakInResponse.json();
                console.log('breakInData', breakInData)
            } else if (breakOut) {
                console.log(result?.text)
                const breakOutResponse = await BreakOutEmployee(result?.text)
                const breakOutData = await breakOutResponse.json();
                console.log('breakOutData', breakOutData)
            }
        }
    };
    return (
        <div style={{ width: '300px' }}>
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
