import {
  loadCaptchaEnginge,
  validateCaptcha,
  LoadCanvasTemplate,
} from "react-simple-captcha";
import React, { useEffect, useState } from "react";

export default function Captcha() {
  const [data, setData] = useState("");
  useEffect(() => {
    loadCaptchaEnginge(3, "red", "green");
  }, []);
  const submit = () => {
    const result = validateCaptcha(data);
    console.log("result", result);

    if (result) {
      alert("验证通过");
    } else {
      alert("验证失败");
    }
  };
  return (
    <div>
      <LoadCanvasTemplate reloadText="刷新" />
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={submit}>提交</button>
    </div>
  );
}
// https://www.npmjs.com/package/react-simple-captcha
