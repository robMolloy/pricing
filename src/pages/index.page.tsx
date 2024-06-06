import { NumberInput, TextInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    width: 10,
    length: 10,
    excavationDepth: 0.2,
    fillDepth: 0.3,
  });
  return (
    <Typography fullPage>
      <h1>Patio Calculator</h1>

      <NumberInput
        label="width"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, width: x })}
        value={formData.width}
        error=""
      />
      <NumberInput
        label="length"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, length: x })}
        value={formData.length}
        error=""
      />
      <NumberInput
        label="excavation depth"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, excavationDepth: x })}
        value={formData.excavationDepth}
        error=""
      />
      <NumberInput
        label="fill depth"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, fillDepth: x })}
        value={formData.fillDepth}
        error=""
      />

      <div className="flex">
        <div className="flex-1">
          <h2>Amounts</h2>

          <div className="flex items-baseline gap-4">
            <div
              className="tooltip"
              data-tip="formData.width * formData.length * formData.excavationDepth"
            >
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">
              Excavation: {formData.width * formData.length * formData.excavationDepth} m^3
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <div
              className="tooltip"
              data-tip="formData.width * formData.length * formData.fillDepth"
            >
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">
              Fill: {formData.width * formData.length * formData.fillDepth} m^3
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="tooltip" data-tip="formData.width * formData.length">
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">Stone: {formData.width * formData.length} m^2</p>
          </div>
        </div>
        <div className="flex-1">
          <h2>Costs</h2>

          <div className="flex items-baseline gap-4">
            <div
              className="tooltip"
              data-tip="formData.width * formData.length * formData.excavationDepth * 50"
            >
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">
              Excavation: £{formData.width * formData.length * formData.excavationDepth * 50}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <div
              className="tooltip"
              data-tip="formData.width * formData.length * formData.fillDepth * 100"
            >
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">
              Fill: £{formData.width * formData.length * formData.fillDepth * 100}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <div className="tooltip" data-tip="formData.width * formData.length * 20">
              <button className="btn btn-circle btn-info">i</button>
            </div>
            <p className="text-xl">Stone: £{formData.width * formData.length * 20} </p>
          </div>
        </div>
      </div>
      <h2>
        Total: £
        {formData.width * formData.length * formData.excavationDepth * 50 +
          formData.width * formData.length * formData.fillDepth * 100 +
          formData.width * formData.length * 20}
      </h2>
    </Typography>
  );
}
