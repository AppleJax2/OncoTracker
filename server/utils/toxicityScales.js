/**
 * Toxicity scales based on:
 * 1. Radiation Therapy Oncology Group (RTOG) scale
 * 2. Veterinary Cooperative Oncology Group - Common Terminology Criteria for Adverse Events (VCOG-CTCAE)
 */

// RTOG Radiation side effects scale
const rtogScale = {
  skin: [
    { grade: 0, description: "No visible changes", ownerDescription: "No visible changes to your pet's skin in the treatment area" },
    { grade: 1, description: "Mild erythema, dry desquamation", ownerDescription: "Slight redness or mild dry flaking of the skin" },
    { grade: 2, description: "Moderate erythema, patchy moist desquamation", ownerDescription: "Moderate redness, or small moist spots on the skin" },
    { grade: 3, description: "Confluent moist desquamation", ownerDescription: "Larger moist areas of skin that may be painful" },
    { grade: 4, description: "Ulceration, hemorrhage, necrosis", ownerDescription: "Open sores or wounds on the skin, may be bleeding" },
    { grade: 5, description: "Death directly related to radiation toxicity", ownerDescription: "Severe reaction requiring urgent veterinary care" }
  ],
  
  mucositis: [
    { grade: 0, description: "No change", ownerDescription: "No changes in your pet's mouth or throat" },
    { grade: 1, description: "Mild erythema", ownerDescription: "Slight redness in your pet's mouth or throat" },
    { grade: 2, description: "Patchy mucositis", ownerDescription: "Spots of irritation in mouth, may cause mild discomfort while eating" },
    { grade: 3, description: "Confluent fibrinous mucositis", ownerDescription: "Widespread irritation in mouth, causing pain and difficulty eating" },
    { grade: 4, description: "Ulceration, hemorrhage, necrosis", ownerDescription: "Severe mouth sores, bleeding, unable to eat normally" },
    { grade: 5, description: "Death directly related to radiation toxicity", ownerDescription: "Severe reaction requiring urgent veterinary care" }
  ],
  
  eye: [
    { grade: 0, description: "No change", ownerDescription: "No changes to your pet's eyes" },
    { grade: 1, description: "Mild conjunctivitis", ownerDescription: "Slight redness of the eyes or eyelids" },
    { grade: 2, description: "Moderate conjunctivitis", ownerDescription: "Moderate eye redness, may have slight discharge" },
    { grade: 3, description: "Severe keratitis", ownerDescription: "Severe eye irritation, discharge, possibly keeping eye closed" },
    { grade: 4, description: "Ulceration, perforation, hemorrhage", ownerDescription: "Serious eye problems that may affect vision" },
    { grade: 5, description: "Death directly related to radiation toxicity", ownerDescription: "Severe reaction requiring urgent veterinary care" }
  ],
  
  gastrointestinal: [
    { grade: 0, description: "No change", ownerDescription: "No digestive or appetite changes" },
    { grade: 1, description: "Mild diarrhea, mild cramping, bowel movement 5 times daily", ownerDescription: "Mild loose stool or slight decrease in appetite" },
    { grade: 2, description: "Moderate diarrhea and colic, bowel movement >5 times daily", ownerDescription: "Multiple loose stools per day or decreased appetite" },
    { grade: 3, description: "Severe diarrhea and colic, dehydration or bleeding", ownerDescription: "Frequent watery diarrhea, vomiting, or significant appetite loss" },
    { grade: 4, description: "Ileus, obstruction, perforation", ownerDescription: "Not eating, severe vomiting or diarrhea, appears in pain" },
    { grade: 5, description: "Death directly related to radiation toxicity", ownerDescription: "Severe reaction requiring urgent veterinary care" }
  ]
};

// VCOG-CTCAE chemotherapy toxicity scale
const vcogCtcaeScale = {
  hematological: [
    { grade: 0, description: "Normal", ownerDescription: "No visible signs of blood-related side effects" },
    { grade: 1, description: "Mild decrease in blood cells", ownerDescription: "No visible symptoms but may be detected on blood tests" },
    { grade: 2, description: "Moderate decrease in blood cells", ownerDescription: "Pet may seem slightly more tired than usual" },
    { grade: 3, description: "Severe decrease, transfusion indicated", ownerDescription: "Noticeable fatigue, pale gums, or decreased activity" },
    { grade: 4, description: "Life-threatening, urgent intervention indicated", ownerDescription: "Very weak, rapid breathing, extremely pale gums" },
    { grade: 5, description: "Death", ownerDescription: "Severe symptoms requiring immediate veterinary care" }
  ],
  
  gastrointestinal: [
    { grade: 0, description: "Normal", ownerDescription: "No digestive or appetite changes" },
    { grade: 1, description: "Decreased appetite without weight loss", ownerDescription: "Slight decrease in appetite but still eating" },
    { grade: 2, description: "Decreased appetite with weight loss; nausea 3-5 episodes in 24hrs", ownerDescription: "Eating less than normal, mild vomiting or diarrhea" },
    { grade: 3, description: "Severe vomiting/diarrhea; requires IV fluids", ownerDescription: "Frequent vomiting or diarrhea, not eating well, appears unwell" },
    { grade: 4, description: "Life-threatening, urgent intervention indicated", ownerDescription: "Severe digestive issues, completely stopped eating, very unwell" },
    { grade: 5, description: "Death", ownerDescription: "Severe symptoms requiring immediate veterinary care" }
  ],
  
  constitutional: [
    { grade: 0, description: "Normal", ownerDescription: "Normal energy and behavior" },
    { grade: 1, description: "Mild fatigue", ownerDescription: "Slightly less active than normal" },
    { grade: 2, description: "Moderate fatigue, limiting instrumental activities", ownerDescription: "Noticeably less active, resting more than usual" },
    { grade: 3, description: "Severe fatigue, limiting self care", ownerDescription: "Very low energy, struggling with normal activities like eating or going outside" },
    { grade: 4, description: "Life-threatening, urgent intervention indicated", ownerDescription: "Extremely weak, unable to stand or move normally" },
    { grade: 5, description: "Death", ownerDescription: "Severe symptoms requiring immediate veterinary care" }
  ],
  
  dermatologic: [
    { grade: 0, description: "Normal", ownerDescription: "No skin changes" },
    { grade: 1, description: "Localized hair loss; mild pruritis", ownerDescription: "Small patches of hair loss or mild itching" },
    { grade: 2, description: "Marked hair loss; moderate pruritis", ownerDescription: "Noticeable hair loss or moderate itching" },
    { grade: 3, description: "Complete hair loss; severe pruritis", ownerDescription: "Extensive hair loss or severe itching causing distress" },
    { grade: 4, description: "Skin necrosis or ulceration", ownerDescription: "Skin wounds, open sores, or severe skin problems" },
    { grade: 5, description: "Death", ownerDescription: "Severe symptoms requiring immediate veterinary care" }
  ]
};

module.exports = {
  rtogScale,
  vcogCtcaeScale
}; 