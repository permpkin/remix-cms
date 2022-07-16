import { useState } from 'react'
import { classNames } from '~/utils';
import { PageHeading } from '~/components/admin/PageHeading';
import { PageWrapper } from '~/components/admin/PageWrapper';

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Config } from "@prisma/client";

import { db } from "~/utils/db.server";
import { SettingsField } from '~/components/admin/SettingsField';

type LoaderData = { config: { [key: string]: string } };

export const loader: LoaderFunction = async () => {
  const configData: { [key: string]: string } = {}
  const configDataResult = await db.config.findMany()
  configDataResult.map((configItem: Config) => {
    configData[configItem.key] = configItem.value
  })
  const data: LoaderData = {
    config: configData,
  };
  return json(data);
};

const settingsLayout = [
  {
    label: 'Meta',
    description: 'Content relating to site meta generally found in the <head>',
    fields: [
      { label: 'Site Name', key: 'site_name', type: 'text' },
      { label: 'Site Description', key: 'site_description', type: 'textarea' }
    ]
  },
  {
    label: 'Visibility',
    description: 'Public Visibility',
    fields: [
      { label: 'Maintenance Mode', key: 'maintenance_mode', type: 'switch' }
    ]
  }
]

export default function AdminPage() {

  const { config } = useLoaderData<LoaderData>();

  console.log(config)

  return (
    <PageWrapper>
      <PageHeading title='Settings'/>
      {
        settingsLayout.map((section) =>
          <div className="mt-10 divide-y divide-gray-200">
            <div className="space-y-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{section.label}</h3>
              <p className="max-w-2xl text-sm text-gray-500">
                {section.description}
              </p>
            </div>
            <div className="mt-6">
              <dl className="divide-y divide-gray-200">
                {
                  section.fields.map((field, fieldIndex) => (
                    <div className={classNames(
                      `py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ${
                        (fieldIndex > 0) ?
                          (fieldIndex === section.fields.length ? 'sm:border-b sm:border-gray-200' : 'sm:pt-5')
                          : ''
                        }`
                    )}>
                      <SettingsField {...field} value={config[field.key] || false}/>
                    </div>
                  ))
                }
              </dl>
            </div>
          </div>
        )
      }
    </PageWrapper>
  );
}
