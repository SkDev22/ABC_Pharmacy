package models

type Invoice struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	MobileNo   string `json:"mobile_no"`
	Email      string `json:"email"`
	Address    string `json:"address"`
	BillingType string `json:"billing_type"`
}
