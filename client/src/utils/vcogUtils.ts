// Define the structure for simplified VCOG definitions
export interface VCOGDefinition {
    symptom: string;
    description: string;
    grades: {
        [key: number]: string; // Grade 0-4 descriptions
    };
}

// Simplified VCOG definitions for common symptoms (expand as needed)
const commonSymptoms: VCOGDefinition[] = [
    {
        symptom: 'Appetite',
        description: 'Interest in food and willingness to eat.',
        grades: {
            0: 'Normal appetite',
            1: 'Decreased intake but eating freely',
            2: 'Minimal intake, may need coaxing/enticing',
            3: 'Anorexia (not eating), may need support (fluids/feeding tube)',
            4: 'Anorexia requiring urgent support (IV fluids/TPN)',
        }
    },
    {
        symptom: 'Vomiting',
        description: 'Forceful ejection of stomach contents.',
        grades: {
            0: 'None',
            1: '1 episode in 24 hours',
            2: '2-5 episodes in 24 hours',
            3: '>5 episodes OR requires IV fluids',
            4: 'Life-threatening (e.g., severe dehydration, requires urgent hospitalization)',
        }
    },
    {
        symptom: 'Diarrhea',
        description: 'Increase in frequency or liquidity of stool.',
        grades: {
            0: 'None / Normal stool',
            1: 'Mild (soft stool), resolves ≤ 24h',
            2: 'Moderate (liquid stool), resolves > 24h',
            3: 'Severe (watery stool), requires hospitalization',
            4: 'Life-threatening (e.g., severe dehydration, requires urgent hospitalization)',
        }
    },
    {
        symptom: 'Lethargy/Fatigue',
        description: 'Decreased activity level and energy.',
        grades: {
            0: 'Normal activity level',
            1: 'Mild decrease in activity',
            2: 'Moderate decrease, resting more but responsive',
            3: 'Severe decrease, reluctant to move, sleeping most of time',
            4: 'Completely inactive, unresponsive or barely responsive',
        }
    },
];

const chemoSpecific: VCOGDefinition[] = [
    {
        symptom: 'Neutropenia Signs (Fever/Infection Risk)',
        description: 'Potential signs related to low white blood cells (neutrophils). Fever > 103F (39.4C) is a key sign.',
        grades: {
            0: 'No fever or signs of infection',
            1: 'No fever, otherwise acting normal',
            2: 'Fever > 103F OR acting mildly unwell',
            3: 'Fever with significant illness (lethargy, poor appetite)',
            4: 'Severe illness/sepsis signs, requires urgent hospitalization',
        }
    },
];

const radiationSpecific: VCOGDefinition[] = [
    {
        symptom: 'Skin Reaction (in treatment area)',
        description: 'Changes to the skin within the radiation field.',
        grades: {
            0: 'No change',
            1: 'Faint redness or dry peeling',
            2: 'Moderate redness, patchy moist peeling, moderate swelling',
            3: 'Severe redness, confluent moist peeling (large areas), severe swelling',
            4: 'Skin necrosis (tissue death) or deep ulceration',
        }
    },
    {
        symptom: 'Mucositis (mouth sores, if head/neck radiation)',
        description: 'Inflammation or sores inside the mouth.',
        grades: {
            0: 'No change',
            1: 'Mild redness or soreness, eating normally',
            2: 'Moderate redness/sores, eating softened diet',
            3: 'Severe sores, unable to eat normal diet, requires support',
            4: 'Severe ulceration, requires urgent support (e.g., feeding tube)',
        }
    },
];

/**
 * Gets a simplified list of VCOG symptoms and grading criteria 
 * relevant to the treatment type.
 * @param treatmentType 'chemo' or 'radiation'
 * @returns Array of VCOGDefinition objects
 */
export const getSimplifiedVCOG = (treatmentType: 'chemo' | 'radiation'): VCOGDefinition[] => {
    let specificSymptoms: VCOGDefinition[] = [];
    if (treatmentType === 'chemo') {
        specificSymptoms = chemoSpecific;
    } else if (treatmentType === 'radiation') {
        specificSymptoms = radiationSpecific;
    }

    // Combine common and specific symptoms
    // Could add logic here to prioritize or order them if needed
    return [...commonSymptoms, ...specificSymptoms];
}; 