<div dir="rtl" style="padding:0 20% 0 20%">

# ברוכים הבאים למעבדה השלישית והאחרונה ב Vue.js  <img src="src/assets/logo.png" width="50" height="43.3" alt="Vue.js Logo">

<!-- ## הכנה

עבור המעבדה הזאת אני מבקש ממכם: -->

## מבוא

במעבדה היום נדבר על שימוש בקומפוננטות של  **Vue-Router**, **שמירת מידע בצורה גלובלית** בתוך האובייקט הראשי. 


## bootstrap-vue

<div dir="ltr" style="padding-left:15%;">

`"With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4."`

</div>

_[קישור לדוקומנטציה](https://bootstrap-vue.org/docs)_

הפלטפורמה bootstrap-vue מאפשרת לנו לייבא קומפוננטות מוכנות מראש שהשימוש שלהן כללי כמו כפתורים, קלטים ועוד.\
אותן קומפוננטות משתמשות בעיצוב של bopotstrap ככה שאם משתמשים בהן מקבלים  את כל העיצוב כבר מוכן.

על מנת להוסיף את bootstrap-vue לפרויקט שלנו צריך לעשות כמה צעדים:

1. להתקין באמצעות npm: <span dir="ltr">`npm install bootstrap-vue bootstrap`</span>

2. בקובץ [main.js](src/main.task.js) נוסיף:

<div dir="ltr" style="padding-left:15%;">

```javascript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
```

</div>

1. בתוך [main.js](src/main.task.js) אנחנו מייבאים ומורידים את הcomponents/plugins  בהם נרצה להשתמש:
   > שימוש בplugins  נותן לנו הרבה קומפוננטות שקשורות לנושא מסוים, כמו למשל form.

<div dir="ltr" style="padding-left:15%;">

```javascript
import { BootstrapVue } from "bootstrap-vue"; // import all components (will add things that we wont use and weigh our project)
Vue.use(BootstrapVue);

import { LayoutPlugin, CardPlugin } from "bootstrap-vue"; // import just the components that we will use
Vue.use(LayoutPlugin);
Vue.use(CardPlugin);
//or
[LayoutPlugin, CardPlugin].forEach((x) => Vue.use(x));
```

</div>

בשביל ליצור טופס יש לרשותנו מגוון קומפוננטות שכולם נעטפות בקומפוננטה **b-form** שנמצאת בplugin בשם FormPlugin.

**[קישור לדוגמאת קוד](https://bootstrap-vue.org/docs/components/form)**



<!-- בנוסף נסדר ונבנה ביחד את סדר קצת יותר נכון של הדברים -->

## **_vue-router_**

הweb בנוי סביב URLs.\
כאשר אנחנו מבקשים לגשת לURL מסוים, נוצרת בקשת HTTP  לקבל את העמוד שמקושר לURL, וכאשר הוא מגיע העמוד מוצג לנו.\
אם נרצה לגשת לעמוד אחר שמקושר בצורה מסוימת לאותו עמוד, אנחנו לרוב נלחץ על לינק שיוציא בקשת HTTP עבור העמוד האחר וכן הלאה.

באפליקציית web שמתבססת על javascript, נוכל לייבא מראש את כל העמודים ולהשתמש ב**router** בשביל לקשר בין מה שמוצג כרגע לבין ה URL.\
כאשר נלחץ על קישור וה URL ישתנה, ה**router** יחליט איזה תצוגה תראה עכשיו בלי לגרום לרענון של הדף (קצת דומה לעבודה 2).

באמצעות השימוש בrouter נוכל בעצם ליצור **SPA - single Page Application** (טוענים עמוד פעם אחת ותחת אותו עמוד תהיה לנו כל האפליקציה).

כאשר אנחנו רוצים ליצור router באפליקציית vue, נשתמש לרוב בספריית **Vue Router**.

 באמצעות הספרייה הזאת נגדיר קומפוננטה בשם **router-view** שאליה יוזרק העמוד (גם קומפוננטה) שאותו נרצה להציג.

את הקישורים לאותם עמודים נגדיר באמצעות קומפוננטות **router-link**.

נוסיף לפרוייקט שלנו קובץ בשם routes.js שיהיה בנוי באופן הבא:

<div id="part0" dir="ltr" style="padding-left:15%;">

```javascript
// import pages components
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";

// define routes
const routes = [.....]

// export routes
export default routes;
```

In main.js:

```javascript
// import Vue Router and install it as a plugin --> enabling this.$router and this.$route
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";
const router = new VueRouter({
  routes
});

new Vue({
  router, // add the router to the main Vue Object
  render: (h) => h(App)
}).$mount("#app");
```

</div>

לאחר שהגדרנו router, נצטרך לומר לאפליקציה שלנו היכן למקם את העמוד שהגדרנו ב router עבור הנתיב שאנחנו נמצאים בו.

לרוב נעשה את זה בתוך [App.vue](src/App.vue) על ידי הקומפוננטה `router-view`:

<div dir="ltr" style="padding-left:15%;">

```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

</div>

על מנת להגדיר את הנתיבים והקומפוננטות של כל אחד, נשתמש בקובץ [routes.js](src/routes.js)

בתחילת הקובץ אפשר לראות שאנחנו מייבאים את הקומפוננטות שאנחנו רוצים להגדיר עבור הנתיבים:

<div id="part1" dir="ltr" style="padding-left:15%;">

```javascript
// import components
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";
```

</div>

לאחר שייבאנו את הקומפוננטות, ניצור מערך בשם routes שיכיל לנו את כל הנתיבים שלנו (<span dir="ltr">`Array<RouteConfig>`</span>).

הגדרה בסיסית של נתיב תראה בצורה הזאת:

<div dir="ltr" style="padding-left:15%;">

```javascript
{
    path: "/",
    name: "main",
    component: Main
}
```

</div>

- **path:** הנתיב לעמוד
- **name:** שם סימבולי של הנתיב
- **component:** הקומפוננטה שתתקבל לאחר הזנת הנתיב

בנוסף קיימים עוד פרמטרים כמו:

- beforeEnter: פוקנציה שתקרא לפני הכניסה לקומפוננטה
- redirect: נוכל לרשום במקום componenet לאיזה נתיב נרצה לעשות redirect

[עוד פרמטרים](https://router.vuejs.org/api/#routes)

הפרמטר component יכול גם להכיל פונקציה שמייבאת את הקומפוננטה כך שלא צריך לייבא אותה [בחלק הראשון](#part1).

> דבר זה נותן לנו אפשרות ליצור טעינה ראשונה מהירה של הדף. זה קורה בעקבות זאת שכל קומפוננטה תיובא רק כאשר באמת נשתמש בה, וכך נחסוך טעינה של קומפוננטות שלא היו בשימוש. 

<div dir="ltr" style="padding-left:15%;">

```javascript
component: () => import("../pages/LoginPage");
```

</div>

יש לנו אפשרות להגדיר מקרה דיפולטי כאשר לrouter לא מוגדר עמוד עבור נתיב מסוים.\
את זה נעשה באמצעות <span dir="ltr">`path: "*"`</span>

[עמוד 404](src/pages/NotFoundPage.vue)

&nbsp;

לאחר שהגדרנו את כל הנתיבים, נייצר את אובייקט הrouter בקובץ main.js: 

<div dir="ltr" style="padding-left:15%;">

```javascript
const router = new VueRouter({
  // mode: "hash",
  routes: routes // our routes
});
```

</div>

באמצעות ההגדרה (בצורה דיפולטית) של ה mode להיות hash, בעצם הגדרנו שאחרי הנתיב הבסיסי של העמוד, יבוא /#/ ואחריו יהיו הנתיבים שהגדרנו בrouter (כמו login).

ה hash מסמל לנו שזה לא נתיב רגיל אלא נתיב פנימי של האפליקציה (נקבל מהשרת אותו עמוד לא משנה איזה נתיב רשמנו).

> האפשרות השניה של mode זה history שמבחינת נראות הוא זהה לURLים שאנחנו בדרך כלל רואים באינטרנט גם עבור אתרים שהם SPA אבל בשביל שSPA יהיה בmode של history אנחנו צריכים להגדיר דברים שלא במסגרת הקורס

עכשיו כשהאפליקציה שלנו משתמשת בrouter, נוכל לייצר קומפוננטה בשם `router-link` על מנת לייצר לינק לנתיב של העמוד אליו אנחנו רוצים להגיע:

<div dir="ltr">

```html
<router-link to="/login">
  Login
</router-link>
or
<router-link :to="{path: '/login'}">
  Login
</router-link>
or
<!-- הכי מומלץ -->
<router-link :to="{name: 'login'}">
  Login
</router-link>
```

</div>

בתוך `router-link` יש לנו property בשם to שאומר לנו מה נתיב היעד.

>

מבחינת פונקציונליות הקומפוננטה של router-link, אם נוסיף לה רק את השדה to היא יכולה לשמש אותנו כמו אלמנט a כך שבלחיצה היא קוראת לפונקציה או מעבירה אותנו לעמוד אחר.

נוכל לנווט את האפליקציה שלנו לעמוד אחר באמצעות הוספת הפקודה הבאה לקוד ה-javascript שלנו: 

<div dir="ltr">

```javascript
this.$router.push("/");
```

</div>

זוהי פונקציה שנוכל להשתמש בה בקוד שלנו והיא נועדה לנווט אותנו לנתיב מסוים.\
אנחנו נרצה להשתמש בה בקוד במקרה כמו login, כך שאחרי שלחצנו על כפתור הlogin וההרשמה התבצעה בהצלחה, נרצה לנתב את המשתמש בחזרה לעמוד הבית בלי שהוא לוחץ על אף כפתור.

**[קישור לדוגמאת קוד login](src/pages/LoginPage.vue)**

&nbsp;

[עוד על Vue Router](https://router.vuejs.org/)

[Vue Router HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

&nbsp;
<!-- 
## <span id="task1" style="color:rgb(111, 155, 197);"> <-- משימה 1 --> </span>

<b style="color:rgb(111, 155, 197);">

עליכם ליצור עמוד חיפוש ולהוסיף אליו קישור.

בשביל זה אנחנו צריכים:

1. ליצור קומפוננטה עבור עמוד חיפוש (תכיל בנתיים כותרת)
2. לייבא אותה ב[routes.js](src/routes.js)
3. להגדיר נתיב חדש שמשתמש בקומפוננטה שיצרתם
4. ליצור קישור ב[App.task.vue](src/App.task.vue)

> לאחר שסיימתם תוכלו לבדוק את עצמכם באמצעות לחיצה על הקישור על הקישור. לאחר שלחצתם על הקישור  תבדקו בשורת הכתובת בדפדפן שהנתיב השתנה והתצוגה שהגדרתם היא זאת שמוצגת.

</b>

&nbsp;

### **_העברת פרמטרים לקומפוננטה דרך הנתיב_**

 על מנת שנוכל להגדיר שחלק מהנתיב שלנו הוא פרמטר שערכו משתנה (כמו שעשינו בAPI), אנחנו צריכים לרשום בנתיב שנגדיר לקומפוננטה מיהם הפרמטרים ואיפה הם מופיעים בנתיב.

הדרך שבה נעשה את זה היא להוסיף נקודותיים לפני מילה מסוימת, כך נגדיר שאותה מילה היא הפרמטר שלנו:

<div dir="ltr" style="padding-left:15%;">

In routes.js:

```javascript
{
    path: "/user/:id",
    name: "user",
    component: User
}
```

In template:

```html
<router-link to="/user/5">
  User
</router-link>
or
<!-- הכי מומלץ -->
<router-link :to="{name:'user', params:{id: 5} }`">
  User
</router-link>
```

</div>

אם נרצה להעביר עוד פרמטרים, נציין אותם בתוך to בצורה הזאת:

<div dir="ltr" style="padding-left:15%;">

```html
<router-link :to="{ name: `user`, params: {id: userid, index: 7} }">
  User
</router-link>
```
</div>

1. לעטוף את קומפוננטת תצוגה מקדימה בrouter-link מסוג שמקשרת את הקומפוננטה לעמוד השחקן/ קבוצה/ משחק הרלוונטי.
2. להגדיר נתיב חדש שמשתמש בקומפוננטה שיצרתם



&nbsp;

## Vuelidate

<div dir="ltr" style="padding-left:15%;">

`"Simple, lightweight model-based validation for Vue.js 2.0"`

</div>

המודול הזה מאפשר לנו ליצור בדיקות קלט בצורה נוחה עם בדיקות שאנחנו מייבאים מהמודול.

_[קישור לדוקומנטציה](https://vuelidate.js.org/)_

<div dir="ltr" style="padding-left:15%;">

In LoginPage.vue (script):

```javascript
import { required } from "vuelidate/lib/validators";
```

</div>

לאחר הייבוא אנחנו נשתמש בפרמטר בשם validations (בתוך הקומפוננטה) שיכיל לנו את הבדיקות:

<div dir="ltr" style="padding-left:15%;">

In LoginPage.vue (export default{}):

```javascript
validations: {
  username: { //name of parameter in data
    required // all of the validations functions
  },
  password: {
    required
  }
},
```

</div>

אחרי שהגדרנו את <span dir="ltr">`validations`</span> נוצר לנו פרמטר בתוך <span dir="ltr">`this`</span> בשם <span dir="ltr">`$v`</span>

[מידע על <span dir="ltr">`$v`</span>](https://vuelidate.js.org/#sub-v-values)

**[קישור לדוגמאת קוד login](src/pages/LoginPage.vue)**

&nbsp;

## save data globaly

לעיתים יהיה מידע שנרצה שהאפליקציה תזכור מבלי לשלוח בקשות לשרת בכל פעם, לדוגמה מהו שם המשתמש המחובר. על מנת לשמור מידע מסוג זה נשתמש בזיכרון של הדפדפן, local storage, ונעשה עליו מניפולציות על פי הצורך.

