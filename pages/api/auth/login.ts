import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract longitude and latitude from request body
    const { longitude, latitude, deviceId } = req.body;

    // Prepare the payload as specified in tempReq.txt
    const payload = {
      longitude: longitude || 73.05687572273979,
      latitude: latitude || 19.304841346592095,
      Inout: "0", // 0 for login
      DeviceId: deviceId || ""
    };

    // Cookie from tempReq.txt
    const cookie = "ASP.NET_SessionId=gj23c3g2nyeq50fqkddpnzqj; frmAuthenticationEmployee=FA59A1358C9B436A65DB5C9CA3F3C3318A16240858D0791D88A75762493BD978D15593CFEDB850C1E9B30D37F93C8D477E7D76323770B4C386159775C023FC9546D4342BFB703CC5B0C0065A259AC1690576096C573B85BD7C340B4BE730BEBD77707977B7B88EB7ECD5699DC6DFB544E7C94BB47F1D307D52161487C67E4EDF834CABE4F62876CC4424653FF52658FDDB0BE13B11822DD375F5A0C69F02E0BC5B9E2052F7E052B2A9BF627D946A5B052FDA6108FF5292AB7972AE79C04DF50E5B97F7A99A47EAE7861505A99DF1BA5E1884D8E18B235BB5D68A4969DD504F9703194BAA64B4E2845137C38AA3A01DF02F2BA9599F46B52C1B0F61A1671C14F2DCD129D0EE504BC116A55E3F155F80AD71E3095EEDD4D831A5360E7FCA436B11FA37B429E4CF4719741AA9AEADCFA6C238E4A4E889B8B31E4171B91BA2E0B3AB07B80BD6E4D8F25BCA4930BE14000244AF26D40FBE4D0B3A3046EECAF6FF25EBF08B4FAD3D0AD32E146DE7090B83CF09BAB9A97A7F2EC2553809E794E1408E37B18D49DBD6D3A08B320F665CB38725A2F79F80BCFB92EB20B66EE02108EDB7DFD62B63FE2C36BDDC7D0721F37B2AEFE1656437D7A3F27F21EF0CD69A9C07DF6A56F7969795A4CACD1191524AC5F17EFA31025C72491855CB6433772CA4BAE353; LastDataFetch=09/05/2025 05:56:45 PM; LastData=87AA2A0678F4B22286EC4F63470FEB7BDE6CBBB534BAF68D2E8F916C1D3715797953DAB04E1852EC695276F45E0100E689EC5510D51C3108B098C9019A1B488A0C9F6B751B5430A17BB56614CA848386CFC55EF8510D4EDCA9CE8642B0922AC4FCB6F342BA8E14DDF5047EE97EF5E6D27AA018A93960F31BA6B4FDC847D9E0A9";
    
    // CSRF token from tempReq.txt
    const csrfToken = "d9f2dfd6-3cbc-4523-9da4-05756ad1d225";

    // Make the request to the external API
    const response = await fetch(
      "https://www.sgcms.in/Emp/EmpDailyPunch/Services/EmpDailyPunch.asmx/PunchTime",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify(payload)
      }
    );

    // Parse the response
    const data = await response.json();

    // Return the response to the client
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
