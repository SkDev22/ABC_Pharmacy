package repository

import (
	"backend/models"
	"database/sql"
)

type InvoiceRepository struct {
	DB *sql.DB
}

// create an invoice
func (repo *InvoiceRepository) CreateInvoice(invoice *models.Invoice) error {
	err := repo.DB.QueryRow(
		"INSERT INTO invoices (name, mobile_no, email, address, billing_type) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		invoice.Name, invoice.MobileNo, invoice.Email, invoice.Address, invoice.BillingType,
	).Scan(&invoice.ID)
	return err
}

// get an invoice by ID
func (repo *InvoiceRepository) GetInvoiceByID(id int) (*models.Invoice, error) {
	var invoice models.Invoice
	err := repo.DB.QueryRow(
		"SELECT id, name, mobile_no, email, address, billing_type FROM invoices WHERE id = $1", id,
	).Scan(&invoice.ID, &invoice.Name, &invoice.MobileNo, &invoice.Email, &invoice.Address, &invoice.BillingType)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, err
		}
		return nil, err
	}
	return &invoice, nil
}

// get all invoices
func (repo *InvoiceRepository) GetAllInvoices() ([]models.Invoice, error) {
	var invoices []models.Invoice

	rows, err := repo.DB.Query(
		"SELECT id, name, mobile_no, email, address, billing_type FROM invoices",
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var invoice models.Invoice
		if err := rows.Scan(&invoice.ID, &invoice.Name, &invoice.MobileNo, &invoice.Email, &invoice.Address, &invoice.BillingType); err != nil {
			return nil, err
		}
		invoices = append(invoices, invoice)
	}

	return invoices, nil
}
