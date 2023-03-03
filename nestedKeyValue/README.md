# Vue 3 + Vite + Composition API

```
version

node v18.12.1
```

```
該如何執行你完成的專案?

npm i

npm run dev
```

```
在這份專案中你遇到的困難、問題，以及解決的方法?

[1.]
困難: TreeData 資料轉換的部份花了一些時間去看其他專案資料格式大概是怎麼定義的,才能去清楚怎麼處理成 TreeData 需要的資料格式。

解決: 看一些其他專案的資料結構定義，再決定該元件資料結構如何定義。

[2.]
困難: @input and v-mode 綁定首次觸發 input event, 畫面沒有及時 render,但資料有改變。

解決: 當資料重新寫進 TreeData Array 時,使用 v-if 銷毀調　TreeData ,但相同耗效能。
```