/**
 * @file constants.tsx
 * This file defines shared constants used throughout the application,
 * including SVG icon components and initial data structures.
 */

import React from 'react';
import type { Page } from './types';

/**
 * PlusIcon Component.
 * Renders a simple plus (+) SVG icon.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-5 h-5"] - Optional CSS classes to apply to the SVG.
 */
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

/**
 * EllipsisVerticalIcon Component.
 * Renders a vertical ellipsis (three dots) SVG icon, typically used for options/menus.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-5 h-5"] - Optional CSS classes to apply to the SVG.
 */
export const EllipsisVerticalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);

/**
 * PencilIcon Component.
 * Renders a pencil SVG icon, typically used for "edit" or "rename" actions.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-4 h-4 mr-2"] - Optional CSS classes to apply to the SVG.
 */
export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4 mr-2"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
);

/**
 * DocumentDuplicateIcon Component.
 * Renders an icon representing document duplication, used for "Duplicate" actions.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-4 h-4 mr-2"] - Optional CSS classes to apply to the SVG.
 */
export const DocumentDuplicateIcon: React.FC<{ className?: string }> = ({ className }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4 mr-2"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m9.75 0h-3.375c-.621 0-1.125.504-1.125 1.125v9.25c0 .621.504 1.125 1.125 1.125h3.375c.621 0 1.125-.504 1.125-1.125v-9.25Z" />
  </svg>
);

/**
 * ClipboardIcon Component.
 * Renders a clipboard SVG icon, used for "Copy" actions.
 * The color is controlled by the `stroke="currentColor"` and the `className` prop.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-4 h-4 mr-2"] - Optional CSS classes to apply to the SVG.
 */
export const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || "w-4 h-4 mr-2"}>
    <path d="M8.66666 2.16667H10.6667C11.0348 2.16667 11.3333 2.46514 11.3333 2.83333V12.5C11.3333 12.8682 11.0348 13.1667 10.6667 13.1667H2.33332C1.96513 13.1667 1.66666 12.8682 1.66666 12.5V2.83333C1.66666 2.46514 1.96513 2.16667 2.33332 2.16667H4.33332M4.99999 3.83333H7.99999C8.36818 3.83333 8.66666 3.53486 8.66666 3.16667V1.5C8.66666 1.13181 8.36818 0.833334 7.99999 0.833334H4.99999C4.6318 0.833334 4.33332 1.13181 4.33332 1.5V3.16667C4.33332 3.53486 4.6318 3.83333 4.99999 3.83333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
  </svg>
);


/**
 * TrashIcon Component.
 * Renders a trash can SVG icon, typically used for "delete" actions.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-4 h-4 mr-2"] - Optional CSS classes to apply to the SVG.
 */
export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-4 h-4 mr-2"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.111 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

/**
 * InformationCircleIcon Component.
 * Renders an "i" in a circle, typically used for informational pages or sections.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-5 h-5"] - Optional CSS classes to apply to the SVG.
 */
export const InformationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

/**
 * CheckCircleIcon Component.
 * Renders a checkmark in a circle, typically used for "ending" or "completion" pages.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-5 h-5"] - Optional CSS classes to apply to the SVG.
 */
export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * DocumentIcon Component.
 * Renders a generic document icon, used for standard intermediate pages.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-5 h-5"] - Optional CSS classes to apply to the SVG.
 */
export const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

/**
 * FlagIcon Component.
 * Renders a flag SVG icon, used for the "Set as first page" action.
 * The color is controlled by the `fill="currentColor"` on the path and the `className` prop.
 * @param {object} props - Component props.
 * @param {string} [props.className="w-4 h-4 mr-2"] - Optional CSS classes to apply to the SVG, including text color for the fill.
 */
export const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="11" height="14" viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg" className={className || "w-4 h-4 mr-2"}>
    <path d="M5.19702 9.48968C3.80363 9.10058 2.55415 8.80158 1.16666 9.37702V13.1664C1.16666 13.4425 0.942799 13.6664 0.666656 13.6664C0.390514 13.6664 0.166656 13.4425 0.166656 13.1664V1.93248C0.166656 1.49723 0.414411 1.062 0.861621 0.884636C2.51915 0.227256 4.00994 0.585905 5.34893 0.956919C5.43675 0.981251 5.5238 1.00557 5.61016 1.0297C6.87557 1.38323 7.99341 1.69554 9.20948 1.40086C9.92454 1.22758 10.8333 1.69562 10.8333 2.59117V8.64105C10.8333 9.0763 10.5856 9.51153 10.1384 9.68889C8.3824 10.3853 6.80248 9.94102 5.39759 9.54595C5.33033 9.52703 5.26347 9.50823 5.19702 9.48968Z" fill="currentColor"/>
  </svg>
);

/**
 * Initial set of pages for the application.
 * Provides some default content when the application loads.
 * Each page is generated with a unique ID using `self.crypto.randomUUID()`.
 */
export const INITIAL_PAGES: Page[] = [
  { id: self.crypto.randomUUID(), name: "Info" },
  { id: self.crypto.randomUUID(), name: "Details" },
  { id: self.crypto.randomUUID(), name: "Other" },
  { id: self.crypto.randomUUID(), name: "Ending" },
];