import React, { FunctionComponent } from 'react';
import MarkdownDisplay from '../general/MarkdownDisplay';
import './Home.css';

const Home: FunctionComponent = () => {

  return (
    <div className='home-container'>
      <div className="image-container">
        <img src="/the_faces_of_ai.png" alt="The Faces of AI" className="blurred" />
        <img src="/the_faces_of_ai.png" alt="The Faces of AI" className="sharp" />
      </div>
      <h1>Automated Analysis Of Metaheuristics</h1>
      <MarkdownDisplay content={
      `## About AAMH ##
### **Introduction**
In an era where artificial intelligence deeply influences diverse fields, from finance to medicine, the demand for robust evaluation of algorithmic performance has never been greater. The software application, grounded in the field of computational intelligence, specifically addresses the experimental analysis of \`metaheuristic algorithms\` - nature-inspired optimization algorithms known with stochastic characteristics.
### **The Challenge**
Metaheuristic algorithms present unique challenges in evaluation and comparison due to their inherent randomness. Traditional parametric hypothesis testing methods falter when applied to \`stochastic optimization algorithms\`, thus the neccesity for a shift towards \`non-parametric statistical methodologies\`. Our system leverages these methodologies for a more accurate and reliable performance evaluation.
### **The Solution**
The development of a full-stack application that integrates a user-friendly web-based front end with powerful \`non-parametric statistical\` testing capabilities. The automated system is designed to facilitate a robust and comprehensive evaluation of metaheuristic algorithms, and thereby the enhancement of the efficiency and reliability of the algorithm evaluation processes.

### **Core Features**
- **Maintainable Archive of Performance Results:** The system keeps an extensive, user-friendly database of algorithm performance metrics and statistical analyses.
- **User-Specific Comparison Requests:** Tailor  analyses to specific needs with the customizable comparison options and evaluation parameters.
- **Visual Representations:** Understand complex data at a glance informative visualizations and data tables.

### **Future Directions**

As the field of computational intelligence evolves, so too will the system. A commitment to continuous improvement, that aims to incorporate more features and greater analysis capabilties. For a full understanding of the methodologies, statistical approaches, and system architecture, please refer to the detailed report.

---
>*"Maar een ding bly seker: as die Natuur in die algemeen 'n primêre siel besit, dan nietemin is hy ver verhewe bo die gewoonste en mees gebiedende dryfvere van die menssiel."* 

>&nbsp;&nbsp; - Eugene N Marais, Die Siel van die Mier

---
`} />
    </div>
  );
}

export default Home;


