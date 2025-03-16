# Debugging Raporu - Shopping Cart 

Bu rapor, Shopping Cart uygulamasındaki hataları tanımlamak ve düzeltmek için yapılan debug işlemlerini içermektedir. Uygulamada stok yönetimi, toplam fiyat hesaplama, indirim uygulaması ve kullanıcı arayüzü güncellemeleri gibi konularda hatalar tespit edilmiş ve bu hataların nasıl giderildiği açıklanmıştır.

## Kodun Yapısı ve Amacı

Uygulama, HTML ve JavaScript olmak üzere iki ana bileşenden oluşmaktadır. HTML, kullanıcı arayüzünü oluştururken, JavaScript ise uygulamanın işlevselliğini sağlamaktadır. JavaScript kodu, ürünleri ve sepeti yöneten `ShoppingCart` ve `App` sınıflarını içermektedir.

## Bulunan Problemler ve Çözümleri

Uygulama test edilirken aşağıdaki problemler tespit edilmiş ve çözülmüştür:

* **Yetersiz Stok Kontrolü**

    * **Problem:** Ürün stoğunun yetersiz olup olmadığı kontrol edilirken `<=` operatörü kullanılıyor. Bu durum, stokta olan ürün adedi kadar ürün eklenememesine yol açıyor.
    * **Çözüm:** `<` operatörü kullanılarak, stokta olan ürün adedi kadar ürün eklenmesi sağlanmalı.

        ``` 
        if (product.stock < quantity) { 
            throw new Error('Yetersiz stok!');
        }  
        ```
* **Ürün Stoğu Güncelleme Hatası:**

    * **Problem:** Ürün sepete eklendiğinde, stok güncellenmiyor. Bu durum, bir ürün eklendiğinde stoğun aynı kalmasına ve ilerleyen süreçte stok hatalarına sebep oluyor.
    * **Çözüm:** Stok miktarı azaltılarak, ürün stoğu güncellenmeli. 

        ``` 
        product.stock -= quantity;  
        ```
* **Ürün Silindiğinde Stoğun Güncellenmeme Hatası:**

    * **Problem:** Ürün sepetten çıkarıldığında, stok güncellenmiyor. Ürün miktarı kadar stok eklenmesi gerektiği için `1` ifadesi yanlış kullanılmış.
    * **Çözüm:** Ürünün miktarı kadar stok geri eklenmeli.

        ``` 
        if (product) {
            product.stock += item.quantity; 
        } 
        ```
* **Toplam Fiyat Hesaplama Hatası:**

    * **Problem:** `calculateTotal` fonksiyonunda, toplam fiyat hesaplanırken ürün miktarı dikkate alınmıyor.
    * **Çözüm:** Ürün miktarı ile ürün fiyatı çarpılmalı.

        ``` 
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        ```
* **İndirim Hesaplama Hatası:**

    * **Problem:** İndirim uygulandığında toplam fiyattan %10 indirim yapmak yerine toplam fiyat %10'a düşürülüyor.
    * **Çözüm:** %10 indirim yapmak için `0.9` ile çarpılmalı.

        ``` 
        if (this.discountApplied && this.total > 0) {
            this.total *= 0.9; 
        }
        ```
* **Hata Mesajları Birikmesi Hatası:**

    * **Problem:** Yeni hata mesajları eklendikçe, eskileri birikiyor ve üst üste görüntüleniyor. Her yeni hata mesajında eski mesajın silinmesi gerekiyor.
    * **Çözüm:** Hata mesajı gösterilmeden önce, eski hata mesajları temizlenmeli.

        ``` 
        errorElement.textContent = message;
        ```

## Sonuç

Bu raporda, Shopping Cart uygulamasında tespit edilen problemlerin nasıl çözüldüğü ve uygulamanın nasıl iyileştirildiği açıklanmıştır. Yukarıdaki hatalar düzeltildiğinde, Alışveriş Sepeti uygulaması daha stabil ve hatasız çalışacaktır. 

- Stok yönetimi geliştirildi.

- İndirim hesaplamaları düzeltildi.

- Sepete ekleme ve silme işlemlerinde tutarsızlıklar giderildi.

- UI hataları iyileştirildi.
