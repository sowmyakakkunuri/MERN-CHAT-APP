import React from "react";

const GenderCheckBox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text-lg">Female</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text-lg">Male</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
