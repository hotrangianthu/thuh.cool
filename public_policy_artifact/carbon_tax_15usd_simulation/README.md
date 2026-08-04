# Vietnam carbon tax impact simulation

This folder contains a formula-driven Excel model testing the thesis that a USD15/tCO2e carbon price could reduce Viet Nam's greenhouse-gas emissions by roughly 3%.

## Files

- `vietnam_carbon_tax_15usd_impact_model_v1_20260714.xlsx` — decision workbook
- `build_model.py` — reproducible workbook generator
- `data_inventory.csv` — source and assumption registry
- `validation_report.txt` — generated QA results
- `rendered/` — visual-QA images generated from Excel PDF export

## Policy cases

1. Pilot ETS
2. USD15 tax only
3. USD15 just transition
4. USD15 protected industry
5. USD30 accelerated

Each case is evaluated under Base, Bull, and Bear behavioural/macro calibrations. Blue cells are editable policy levers; green cells are cited research anchors; yellow cells are key swing assumptions.

## Important limitation

This is a transparent thesis simulation calibrated to the 13 July 2026 VnExpress summary of the IPSS-UNDP study. It is not a reproduction of the underlying computable general-equilibrium model and should not be used as a statutory revenue forecast.
