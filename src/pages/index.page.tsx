import { NumberInput, TextInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";

const DisplayData = (
  p: { material: string; qty: number; formula: string } & (
    | { leftUnit: string }
    | { rightUnit: string }
  ),
) => {
  return (
    <div className="flex items-baseline gap-4">
      <div className="tooltip" data-tip={p.formula}>
        <button className="btn btn-circle btn-info">i</button>
      </div>
      <p className="text-xl">
        {p.material}: {p.qty} m^3
      </p>
    </div>
  );
};

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

          <DisplayData
            formula="formData.width * formData.length * formData.excavationDepth"
            qty={formData.width * formData.length * formData.excavationDepth}
            material="Fill"
            rightUnit="m^3"
          />
          <DisplayData
            formula="formData.width * formData.length * formData.fillDepth"
            qty={formData.width * formData.length * formData.fillDepth}
            material="Fill"
            rightUnit="m^3"
          />
          <DisplayData
            formula="formData.width * formData.length"
            qty={formData.width * formData.length}
            material="Stone"
            rightUnit="m^2"
          />
        </div>

        <div className="flex-1">
          <h2>Costs</h2>
          <DisplayData
            formula="formData.width * formData.length * formData.excavationDepth * 50"
            qty={formData.width * formData.length * formData.excavationDepth * 50}
            material="Excavation"
            leftUnit="£"
          />
          <DisplayData
            formula="formData.width * formData.length * formData.fillDepth * 100"
            qty={formData.width * formData.length * formData.fillDepth * 100}
            material="Fill"
            leftUnit="£"
          />

          <DisplayData
            formula="formData.width * formData.length * 20"
            qty={formData.width * formData.length * 20}
            material="Stone"
            leftUnit="£"
          />
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
