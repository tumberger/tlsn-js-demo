import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { prove, verify } from 'tlsn-js';
import { Proof } from 'tlsn-js/build/types';
import { Watch } from 'react-loader-spinner';
// import React, { ReactElement, useCallback, useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { prove, verify } from './tlsn'; // Adjust the import path according to your project structure
// import { Proof } from './types'; // Adjust the import path according to your project structure
// import { Watch } from 'react-loader-spinner';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);

function App(): ReactElement {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{
    time: number;
    sent: string;
    recv: string;
    notaryUrl: string;
  } | null>(null);
  const [proof, setProof] = useState<Proof | null>(null);

  const onClick = useCallback(async () => {
    setProcessing(true);

    // Check if environment variables are defined
    if (!process.env.REACT_APP_DTCOOKIE || !process.env.REACT_APP_PD_S_SESSION_ID || !process.env.REACT_APP_PD_ID) {
      console.error("Required environment variables are not defined.");
      return;
    }

    const cookies = `dtCookie=${process.env.REACT_APP_DTCOOKIE}; PD-S-SESSION-ID=${process.env.REACT_APP_PD_S_SESSION_ID}; PD-ID=${process.env.REACT_APP_PD_ID}; YSNP01a648be=${process.env.REACT_APP_YSNP01A648BE}; YSNP01658239=${process.env.REACT_APP_YSNP01658239}`;
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cookie': cookies, // Using the cookies from your browser's request
      'DNT': '1',
      'Sec-GPC': '1',
    };

    const p = await prove('https://secure.ssa.gov/myssa/bec-plan-prep-api/userInfo', {
      method: 'GET',
      headers,
      maxSentData: 5000,
      maxRecvData: 15000,
      maxTranscriptSize: 40000,
      notaryUrl: 'https://notary.pse.dev/v0.1.0-alpha.5',
      websocketProxyUrl: 'ws://localhost:55688',
      secretHeaders: ['Cookie'], // Marking cookies as secret to ensure they are treated securely
    });
    setProof(p);
  }, []);

  useEffect(() => {
    (async () => {
      if (proof) {
        const r = await verify(proof);
        setResult(r);
        setProcessing(false);
      }
    })();
  }, [proof]);

  return (
    <div>
      <button onClick={!processing ? onClick : undefined} disabled={processing}>
        Start demo
      </button>
      <div>
        <b>Proof: </b>
        {!processing && !proof ? (
          <i>not started</i>
        ) : !proof ? (
          <>
            Proving data...
            <Watch
              visible={true}
              height="40"
              width="40"
              radius="48"
              color="#000000"
              ariaLabel="watch-loading"
            />
            Open <i>Developer tools</i> to follow progress
          </>
        ) : (
          <>
            <details>
              <summary>View Proof</summary>
              <pre>{JSON.stringify(proof, null, 2)}</pre>
            </details>
          </>
        )}
      </div>
      <div>
        <b>Verification: </b>
        {!proof ? (
          <i>not started</i>
        ) : !result ? (
          <i>verifying</i>
        ) : (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
