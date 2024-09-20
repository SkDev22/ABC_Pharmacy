package routes

import (
	"backend/controllers"
	"backend/repository"
	"database/sql"

	"github.com/gorilla/mux"
)

func InitializeRoutes(db *sql.DB) *mux.Router {
	itemRepo := repository.ItemRepository{DB: db}
	itemController := controllers.ItemController{Repo: itemRepo}

	invoiceRepo := repository.InvoiceRepository{DB: db}
	invoiceController := controllers.InvoiceController{Repo: invoiceRepo}

	r := mux.NewRouter()

	// Item Routes
	r.HandleFunc("/items", itemController.GetItems).Methods("GET")          
	r.HandleFunc("/items/{id}", itemController.GetItemByID).Methods("GET")   
	r.HandleFunc("/items", itemController.CreateItem).Methods("POST")        
	r.HandleFunc("/items/{id}", itemController.UpdateItem).Methods("PUT")    
	r.HandleFunc("/items/{id}", itemController.DeleteItem).Methods("DELETE") 

	// Invoice Routes
	r.HandleFunc("/invoices", invoiceController.CreateInvoice).Methods("POST")
	r.HandleFunc("/invoices/{id}", invoiceController.GetInvoiceByID).Methods("GET") 
	r.HandleFunc("/invoices", invoiceController.GetAllInvoices).Methods("GET") 

	return r
}
