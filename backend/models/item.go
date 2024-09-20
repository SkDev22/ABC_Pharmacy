package models

type Item struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	UnitPrice   float64 `json:"unit_price"`
	Category    string  `json:"category"`
}
