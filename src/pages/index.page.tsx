import { NumberInput, TextInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { z } from "zod";

const DisplayData = (p: {
  material: string;
  qty: number;
  formula: string;
  leftUnit?: string;
  rightUnit?: string;
}) => {
  return (
    <div className="flex items-baseline gap-4">
      <div className="tooltip" data-tip={p.formula}>
        <button className="btn btn-circle btn-info">i</button>
      </div>
      <p className="text-xl">
        {p.material}: {p.leftUnit}
        {p.qty} {p.rightUnit}
      </p>
    </div>
  );
};

function multiplyArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}
function sumArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
type TDimensions = { [key: string]: { unit: string } };

type TProcedure = {
  [key: string]: {
    dimensions: string[];
    unit: string;
    costPerUnit: number;
  };
};

export default function Home() {
  const [newDimension, setNewDimension] = useState("");
  const [newDimensionUnit, setNewDimensionUnit] = useState("");

  const [newProcedureName, setNewProcedureName] = useState("");
  const [newProcedureUnit, setNewProcedureUnit] = useState("");
  const [newProcedureCostPerUnit, setNewProcedureCostPerUnit] = useState(0);

  const [newProcedureDimensions, setNewProcedureDimensions] = useState<string[]>([]);

  const [formData, setFormData] = useState<{ [key: string]: number }>({});

  const [dimensions, setDimensions] = useState<TDimensions>({});
  const [procedures, setProcedures] = useState<TProcedure>({});
  const dimensionKeys = Object.keys(dimensions) as string[];
  const totalCost = sumArray(
    Object.values(procedures).map((groupData) =>
      multiplyArray([
        ...groupData.dimensions.map((dimension) => formData[dimension]),
        groupData.costPerUnit,
      ]),
    ),
  );
  return (
    <Typography fullPage>
      {/* <div className="flex gap-4">
        <pre className="flex-1">{JSON.stringify({ dimensions }, undefined, 2)}</pre>
        <pre className="flex-1">{JSON.stringify({ procedures }, undefined, 2)}</pre>
        <pre className="flex-1">{JSON.stringify({ result: totalCost }, undefined, 2)}</pre>
      </div> */}
      <button
        className="btn"
        onClick={() => {
          console.log(process.env.NEXT_PUBLIC_TEST_ENV_VAR_2);
        }}
      >
        click me
      </button>
      <h2>Add Dimensions</h2>
      <div className="flex items-center gap-4">
        <TextInput label="new dim" onInput={(x) => setNewDimension(x)} value={newDimension} />
        <TextInput
          label="new dim unit"
          onInput={(x) => setNewDimensionUnit(x)}
          value={newDimensionUnit}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setDimensions({ ...dimensions, [newDimension]: { unit: newDimensionUnit } });
            setNewDimension("");
            setNewDimensionUnit("");
          }}
        >
          addDimension
        </button>
      </div>
      <h2>Add Procedures</h2>
      <div className="flex items-center gap-4">
        <TextInput
          label="new procedure name"
          onInput={(x) => setNewProcedureName(x)}
          value={newProcedureName}
        />
        <NumberInput
          label="new procedure costPerUnit"
          onInput={(x) => setNewProcedureCostPerUnit(x)}
          value={newProcedureCostPerUnit}
        />
        <TextInput
          label="new procedure unit"
          onInput={(x) => setNewProcedureUnit(x)}
          value={newProcedureUnit}
        />
      </div>
      <div className="flex items-center gap-4">
        {dimensionKeys.map((dimensionKey) => (
          <button
            key={`${dimensionKey}-procedure`}
            className="btn btn-accent"
            onClick={() => {
              setNewProcedureDimensions([...newProcedureDimensions, dimensionKey]);
            }}
          >
            {dimensionKey}
          </button>
        ))}
        <button
          className="btn btn-warning"
          onClick={() => {
            setNewProcedureDimensions([]);
          }}
        >
          X
        </button>
        <div className="flex-1">
          {newProcedureDimensions.length === 0 ? (
            <div>Pick the dimensions used to create your job</div>
          ) : (
            newProcedureDimensions.join(" * ")
          )}
        </div>
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={() => {
          setProcedures({
            ...procedures,
            [newProcedureName]: {
              costPerUnit: newProcedureCostPerUnit,
              dimensions: newProcedureDimensions,
              unit: newProcedureUnit,
            },
          });

          setNewProcedureCostPerUnit(0);
          setNewProcedureDimensions([]);
          setNewProcedureUnit("");
          setNewProcedureName("");
        }}
      >
        Add Procedure
      </button>
      <div className="flex items-center gap-4"></div>
      <h2>Add measurements</h2>
      {dimensionKeys.map((dimensionName) => {
        return (
          <NumberInput
            key={dimensionName}
            label={dimensionName}
            onInput={(x) => setFormData({ ...formData, [dimensionName]: x })}
            value={formData[dimensionName]}
          />
        );
      })}
      <div className="flex">
        <div className="flex-1">
          <h2>Amounts</h2>

          {Object.entries(procedures).map(([groupName, groupData]) => (
            <DisplayData
              key={`${groupName}-amount`}
              formula={groupData.dimensions.join(" * ")}
              qty={multiplyArray(groupData.dimensions.map((dimension) => formData[dimension]))}
              material={groupName}
              rightUnit={`m^${groupData.dimensions.length}`}
            />
          ))}
        </div>

        <div className="flex-1">
          <h2>Costs</h2>
          {Object.entries(procedures).map(([groupName, groupData]) => (
            <DisplayData
              key={`${groupName}-costs`}
              formula={[...groupData.dimensions, groupData.costPerUnit].join(" * ")}
              qty={multiplyArray([
                ...groupData.dimensions.map((dimension) => formData[dimension]),
                groupData.costPerUnit,
              ])}
              material={groupName}
              leftUnit="£"
            />
          ))}
        </div>
      </div>
      <h2>Total: £{totalCost}</h2>
    </Typography>
  );
}
