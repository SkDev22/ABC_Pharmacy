package controllers

import (
	"backend/models"
	"backend/repository"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type InvoiceController struct {
	Repo repository.InvoiceRepository
}

// create an invoice
func (c *InvoiceController) CreateInvoice(w http.ResponseWriter, r *http.Request) {
	var invoice models.Invoice
	err := json.NewDecoder(r.Body).Decode(&invoice)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = c.Repo.CreateInvoice(&invoice)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(invoice)
}

// get an invoice by ID
func (c *InvoiceController) GetInvoiceByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	invoiceID, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Invalid invoice ID", http.StatusBadRequest)
		return
	}

	invoice, err := c.Repo.GetInvoiceByID(invoiceID)
	if err != nil {
		http.Error(w, "Invoice not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(invoice)
}

// get all invoices
func (c *InvoiceController) GetAllInvoices(w http.ResponseWriter, r *http.Request) {
	invoices, err := c.Repo.GetAllInvoices()
	if err != nil {
		http.Error(w, "Unable to fetch invoices", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(invoices)
}
