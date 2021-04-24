package main

import (
	"bufio"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/gorilla/mux"
)

var mutex = sync.Mutex{}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/sync/images/{id}", getSync).Methods("GET")
	r.HandleFunc("/async/images/{id}", getAsync).Methods("GET")
	fmt.Println("Listening in localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func getSync(w http.ResponseWriter, r *http.Request) {
	mutex.Lock()
	defer mutex.Unlock()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	f, err := os.Open(fmt.Sprintf("./images/%s.jpg", params["id"]))
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		fmt.Println(err.Error())
		return
	}
	defer f.Close()
	reader := bufio.NewReader(f)
	content, _ := ioutil.ReadAll(reader)

	// Encode as base64.
	encoded := base64.StdEncoding.EncodeToString(content)

	w.Write([]byte(encoded))
}

func getAsync(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	f, err := os.Open(fmt.Sprintf("./images/%s.jpg", params["id"]))
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer f.Close()
	reader := bufio.NewReader(f)
	content, _ := ioutil.ReadAll(reader)

	// Encode as base64.
	encoded := base64.StdEncoding.EncodeToString(content)

	w.Write([]byte(encoded))
}
